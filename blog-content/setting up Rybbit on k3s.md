---
tags:
  - k3s
  - rybbit
  - proxmox
  - selfhosted
description: a quick guide on how to self-host Rybbit on k3s
title: open-source web analytics in 10mins
---
a complete walkthrough for running rybbit (open-source web analytics) on a 3-node k3s cluster provisioned on proxmox, exposed via a tailscale-connected caddy reverse proxy.

the traffic flow looks like this: browser → caddy (tls termination) → tailscale tunnel → `k3s-server-1` nodeposts → kube-proxy → whichever agent holds the pod. the server node runs no application workloads — it's reserved for the control plane.

---

#### prerequisites

you'll need four machines enrolled in the same tailscale tailnet:

- `k3s-server-1` at `10.0.0.201` — control plane only (tainted noschedule)
- `k3s-agent-1` at `10.0.0.202` — stateful pods (clickhouse, postgresql); must be x86_64 with AVX2 or ARMv8.2-A+
- `k3s-agent-2` at `10.0.0.203` — stateless pods (redis, backend, client)
- caddy server with a public IP — ports 80 and 443 open

point an A record at your caddy server's public IP before continuing. caddy can't get a certificate without it.

#### provisioning k3s via ansible

i'm using my own `k3s-ansible` playbook. the inventory and config need to be correct before running anything.

verify `ansible.cfg` has the inventory line (ansible silently skips everything if it's missing):

```ini
[defaults]
host_key_checking = False
inventory = inventory/hosts.ini
```

`inventory/hosts.ini` should look like:

```ini
[k3s_servers]
10.0.0.201

[k3s_agents]
10.0.0.202
10.0.0.203

[k3s_cluster:children]
k3s_servers
k3s_agents

[k3s_cluster:vars]
ansible_user=kenf
ansible_become=true
```

dry-run first to make sure all hosts are picked up:

```bash
ansible-playbook site.yml --ask-vault-pass --list-hosts
```

then run it for real:

```bash
ansible-playbook site.yml --ask-vault-pass
```

a successful run ends with `failed=0` and `unreachable=0` for all three nodes. verify:

```bash
kubectl get nodes
```

all three should be `Ready` before continuing. taint the server node so it doesn't schedule application workloads:

```bash
kubectl taint nodes k3s-server-1 node-role.kubernetes.io/control-plane:NoSchedule
```

> [!note] kube-proxy still runs on `k3s-server-1` despite the taint, so nodeposts 30300 and 30301 remain reachable there. caddy can keep targeting this node as the cluster entry point.

#### storage strategy

this is the most important decision before deploying. k3s ships with `local-path-provisioner` by default, which means PVCs are node-local. if clickhouse or postgres ever reschedules to a different node, it'll get stuck in `Pending` forever because its data only exists on the original node.

**option A — pin stateful pods to `k3s-agent-1`** (what i'm doing)

add a `nodeSelector` to the clickhouse and postgres deployments:

```yaml
spec:
  template:
    spec:
      nodeSelector:
        kubernetes.io/hostname: k3s-agent-1
```

simple to reason about, zero extra setup. the tradeoff is that if `k3s-agent-1` goes down, analytics go down too. good enough for a homelab.

**option B — longhorn distributed storage** (if you want real HA)

```bash
helm repo add longhorn https://charts.longhorn.io
helm repo update
helm install longhorn longhorn/longhorn \
  --namespace longhorn-system \
  --create-namespace \
  --set defaultSettings.defaultReplicaCount=2
```

then add `storageClassName: longhorn` to both PVCs and remove the `nodeSelector` blocks. longhorn adds ~500 MB RAM overhead across nodes and slower writes (replication latency), but pods can reschedule freely and survive a node failure.

i'd start with option A and migrate to longhorn if you actually need to do node maintenance.

#### deploying rybbit

ssh into `k3s-server-1`:

```bash
mkdir ~/rybbit && cd ~/rybbit
nano rybbit.yaml
```

generate a secret before filling in the manifest:

```bash
openssl rand -base64 32
```

paste the full manifest below, filling in every `# <CHANGE_ME>` value:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: rybbit

---
apiVersion: v1
kind: Secret
metadata:
  name: rybbit-secrets
  namespace: rybbit
type: Opaque
stringData:
  POSTGRES_USER: "rybbit"                                      # <CHANGE_ME>
  POSTGRES_PASSWORD: "changeme"                                # <CHANGE_ME>
  POSTGRES_DB: "analytics"
  CLICKHOUSE_USER: "default"
  CLICKHOUSE_PASSWORD: "changeme"                              # <CHANGE_ME>
  CLICKHOUSE_DB: "analytics"
  BETTER_AUTH_SECRET: "replace-with-openssl-rand-base64-32"   # <CHANGE_ME>
  BASE_URL: "https://rybbit.yourdomain.com"                    # <CHANGE_ME>
  DISABLE_SIGNUP: "false"

---
apiVersion: v1
kind: ConfigMap
metadata:
  name: clickhouse-config
  namespace: rybbit
data:
  listen.xml: |
    <clickhouse>
      <listen_host>0.0.0.0</listen_host>
    </clickhouse>
  logging.xml: |
    <clickhouse>
      <logger>
        <level>warning</level>
        <console>true</console>
      </logger>
    </clickhouse>

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: clickhouse-data
  namespace: rybbit
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: clickhouse
  namespace: rybbit
  labels:
    app: clickhouse
spec:
  replicas: 1
  selector:
    matchLabels:
      app: clickhouse
  template:
    metadata:
      labels:
        app: clickhouse
    spec:
      nodeSelector:
        kubernetes.io/hostname: k3s-agent-1
      containers:
        - name: clickhouse
          image: clickhouse/clickhouse-server:25.4.2
          ports:
            - containerPort: 8123
            - containerPort: 9000
          env:
            - name: CLICKHOUSE_DB
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: CLICKHOUSE_DB
            - name: CLICKHOUSE_USER
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: CLICKHOUSE_USER
            - name: CLICKHOUSE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: CLICKHOUSE_PASSWORD
          volumeMounts:
            - name: data
              mountPath: /var/lib/clickhouse
            - name: config
              mountPath: /etc/clickhouse-server/config.d
          livenessProbe:
            httpGet:
              path: /ping
              port: 8123
            initialDelaySeconds: 20
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /ping
              port: 8123
            initialDelaySeconds: 10
            periodSeconds: 5
          resources:
            requests:
              memory: "512Mi"
              cpu: "250m"
            limits:
              memory: "2Gi"
              cpu: "1000m"
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: clickhouse-data
        - name: config
          configMap:
            name: clickhouse-config

---
apiVersion: v1
kind: Service
metadata:
  name: clickhouse
  namespace: rybbit
spec:
  selector:
    app: clickhouse
  ports:
    - name: http
      port: 8123
      targetPort: 8123
    - name: native
      port: 9000
      targetPort: 9000

---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-data
  namespace: rybbit
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: postgres
  namespace: rybbit
  labels:
    app: postgres
spec:
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      nodeSelector:
        kubernetes.io/hostname: k3s-agent-1
      containers:
        - name: postgres
          image: postgres:17.4
          ports:
            - containerPort: 5432
          env:
            - name: POSTGRES_USER
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: POSTGRES_USER
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: POSTGRES_PASSWORD
            - name: POSTGRES_DB
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: POSTGRES_DB
          volumeMounts:
            - name: data
              mountPath: /var/lib/postgresql/data
          livenessProbe:
            exec:
              command: ["pg_isready", "-U", "$(POSTGRES_USER)"]
            initialDelaySeconds: 15
            periodSeconds: 10
          readinessProbe:
            exec:
              command: ["pg_isready", "-U", "$(POSTGRES_USER)"]
            initialDelaySeconds: 5
            periodSeconds: 5
          resources:
            requests:
              memory: "256Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "500m"
      volumes:
        - name: data
          persistentVolumeClaim:
            claimName: postgres-data

---
apiVersion: v1
kind: Service
metadata:
  name: postgres
  namespace: rybbit
spec:
  selector:
    app: postgres
  ports:
    - port: 5432
      targetPort: 5432

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: redis
  namespace: rybbit
  labels:
    app: redis
spec:
  replicas: 1
  selector:
    matchLabels:
      app: redis
  template:
    metadata:
      labels:
        app: redis
    spec:
      containers:
        - name: redis
          image: redis:7-alpine
          ports:
            - containerPort: 6379
          livenessProbe:
            exec:
              command: ["redis-cli", "ping"]
            initialDelaySeconds: 10
            periodSeconds: 10
          readinessProbe:
            exec:
              command: ["redis-cli", "ping"]
            initialDelaySeconds: 5
            periodSeconds: 5
          resources:
            requests:
              memory: "64Mi"
              cpu: "50m"
            limits:
              memory: "256Mi"
              cpu: "200m"

---
apiVersion: v1
kind: Service
metadata:
  name: redis
  namespace: rybbit
spec:
  selector:
    app: redis
  ports:
    - port: 6379
      targetPort: 6379

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rybbit-backend
  namespace: rybbit
  labels:
    app: rybbit-backend
spec:
  replicas: 1
  selector:
    matchLabels:
      app: rybbit-backend
  template:
    metadata:
      labels:
        app: rybbit-backend
    spec:
      containers:
        - name: backend
          image: ghcr.io/rybbit-io/rybbit-backend:latest
          ports:
            - containerPort: 3001
          env:
            - name: NODE_ENV
              value: "production"
            - name: CLICKHOUSE_HOST
              value: "http://clickhouse:8123"
            - name: CLICKHOUSE_DB
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: CLICKHOUSE_DB
            - name: CLICKHOUSE_USER
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: CLICKHOUSE_USER
            - name: CLICKHOUSE_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: CLICKHOUSE_PASSWORD
            - name: POSTGRES_HOST
              value: "postgres"
            - name: POSTGRES_PORT
              value: "5432"
            - name: POSTGRES_USER
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: POSTGRES_USER
            - name: POSTGRES_PASSWORD
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: POSTGRES_PASSWORD
            - name: POSTGRES_DB
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: POSTGRES_DB
            - name: REDIS_URL
              value: "redis://redis:6379"
            - name: BETTER_AUTH_SECRET
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: BETTER_AUTH_SECRET
            - name: BASE_URL
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: BASE_URL
            - name: DISABLE_SIGNUP
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: DISABLE_SIGNUP
          livenessProbe:
            httpGet:
              path: /api/health
              port: 3001
            initialDelaySeconds: 30
            periodSeconds: 15
          readinessProbe:
            httpGet:
              path: /api/health
              port: 3001
            initialDelaySeconds: 15
            periodSeconds: 10
          resources:
            requests:
              memory: "256Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "500m"

---
apiVersion: v1
kind: Service
metadata:
  name: rybbit-backend
  namespace: rybbit
spec:
  selector:
    app: rybbit-backend
  ports:
    - port: 3001
      targetPort: 3001

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: rybbit-client
  namespace: rybbit
  labels:
    app: rybbit-client
spec:
  replicas: 1
  selector:
    matchLabels:
      app: rybbit-client
  template:
    metadata:
      labels:
        app: rybbit-client
    spec:
      containers:
        - name: client
          image: ghcr.io/rybbit-io/rybbit-client:latest
          ports:
            - containerPort: 3002
          env:
            - name: NEXT_PUBLIC_BACKEND_URL
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: BASE_URL
            - name: NEXT_PUBLIC_DISABLE_SIGNUP
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: DISABLE_SIGNUP
            - name: BETTER_AUTH_URL
              valueFrom:
                secretKeyRef:
                  name: rybbit-secrets
                  key: BASE_URL
          livenessProbe:
            httpGet:
              path: /
              port: 3002
            initialDelaySeconds: 30
            periodSeconds: 15
          readinessProbe:
            httpGet:
              path: /
              port: 3002
            initialDelaySeconds: 15
            periodSeconds: 10
          resources:
            requests:
              memory: "256Mi"
              cpu: "100m"
            limits:
              memory: "512Mi"
              cpu: "500m"

---
# caddy proxies /* to <k3s-server-1-tailscale-ip>:30300
apiVersion: v1
kind: Service
metadata:
  name: rybbit-client
  namespace: rybbit
spec:
  type: NodePort
  selector:
    app: rybbit-client
  ports:
    - port: 3002
      targetPort: 3002
      nodePort: 30300

---
# caddy proxies /api/* to <k3s-server-1-tailscale-ip>:30301
apiVersion: v1
kind: Service
metadata:
  name: rybbit-backend-nodeport
  namespace: rybbit
spec:
  type: NodePort
  selector:
    app: rybbit-backend
  ports:
    - port: 3001
      targetPort: 3001
      nodePort: 30301
```

apply it:

```bash
kubectl apply -f rybbit.yaml
kubectl -n rybbit get pods -w
```

the backend pod will restart once or twice while it waits for clickhouse and postgres to pass their readiness probes — this is normal. give it 2–3 minutes.

verify the nodeports are responding from `k3s-server-1`:

```bash
curl -s http://localhost:30300 | head -5     # should return HTML
curl -s http://localhost:30301/api/health    # should return JSON
```

#### exposing via caddy

i'm using [caddy](https://notes.kenf.dev/self-hosted/caddy-server) on a separate server, connected to the cluster via tailscale. add the following to your `Caddyfile` (replace `<k3s-server-1-tailscale-ip>` with the tailscale IP of your server node):

```
rybbit.yourdomain.com {

    handle /api/* {
        reverse_proxy <k3s-server-1-tailscale-ip>:30301 {
            header_up X-Real-IP {remote_host}
            header_up X-Forwarded-For {remote_host}
            header_up X-Forwarded-Proto {scheme}
            transport http {
                keepalive 30s
                keepalive_idle_conns 10
            }
        }
    }

    handle {
        reverse_proxy <k3s-server-1-tailscale-ip>:30300 {
            header_up X-Real-IP {remote_host}
            header_up X-Forwarded-For {remote_host}
            header_up X-Forwarded-Proto {scheme}
            transport http {
                keepalive 30s
                keepalive_idle_conns 10
            }
        }
    }

    tls {
        protocols tls1.2 tls1.3
    }

    log {
        output file /var/log/caddy/rybbit.log {
            roll_size 10mb
            roll_keep 5
        }
        format json
    }
}
```

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
```

#### first login

navigate to `https://rybbit.yourdomain.com/signup` and create your admin account. once that's done, lock down signups:

```bash
kubectl -n rybbit edit secret rybbit-secrets
# change DISABLE_SIGNUP from "false" to "true"

kubectl -n rybbit rollout restart deployment/rybbit-backend
```
note: you'll need to update `rybbit.yaml` as well, for this behaviour to persist

then add your first site from the dashboard and drop the tracking snippet into your site's `<head>`.

#### maintenance

updating (the backend and client are stateless, so this is safe):

```bash
kubectl -n rybbit rollout restart deployment/rybbit-backend
kubectl -n rybbit rollout restart deployment/rybbit-client
```

consider pinning to a specific image tag in production rather than `:latest`.

backing up the databases:

```bash
# postgres
kubectl -n rybbit exec -it deploy/postgres -- \
  pg_dump -U rybbit analytics > rybbit-postgres-$(date +%F).sql

# clickhouse events table
kubectl -n rybbit exec -it deploy/clickhouse -- \
  clickhouse-client --query \
  "SELECT * FROM analytics.events FORMAT Native" > rybbit-events-$(date +%F).bin
```

#### troubleshooting

**pods stuck in `Pending`** — most likely the nodeselector hostname doesn't match. verify with:

```bash
kubectl get node k3s-agent-1 --show-labels | grep hostname
# should show: kubernetes.io/hostname=k3s-agent-1
```

**clickhouse won't start (SIGILL)** — your VM's CPU doesn't expose AVX2. check inside the VM:

```bash
grep -o 'avx2' /proc/cpuinfo | head -1
```

if empty, change the CPU type in proxmox from `kvm64` to `host` and reboot.

**caddy 502** — the nodeports aren't reachable from the caddy server. check tailscale connectivity first, then verify the firewall rules on `k3s-server-1` are still active:

```bash
sudo firewall-cmd --list-rich-rules
```

**backend keeps restarting** — it's waiting for clickhouse or postgres. check their readiness:

```bash
kubectl -n rybbit get pods
kubectl -n rybbit logs -l app=clickhouse --tail=30
```

#k3s #rybbit #proxmox #selfhosted