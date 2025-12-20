---
tags:
  - self-hosting
  - hypervisors
  - proxmox
  - ip
---
- **NODE**: the node receiving the new IP address
- **CLUSTER**: all other Proxmox nodes that will maintain quorum and remain connected
## on NODE
1. edit `/etc/pve/corosync.conf`
   - update node's ip
   - increment `config_version`
2. edit `/etc/network/interfaces` → update ip
3. edit `/etc/hosts` → update ip
4. apply network: `ifdown vmbr0 && ifup vmbr0`
5. restart services:
   ```bash
   systemctl restart corosync
   systemctl restart pve-cluster
   ```

## on CLUSTER
1. verify new `corosync.conf` is present
2. restart corosync on each node:
   ```bash
   systemctl restart corosync
   ```

## verification
run on any node:
```bash
pvecm status
cat /etc/pve/.members
```
should show all nodes with correct ips.

## cleanup (on NODE)
- update `/etc/issue` (optional)
- update `/etc/pve/storage.cfg` if old ip referenced
- update `/etc/pve/priv/known_hosts` (optional)
- note: vms/containers may need reboot for network

## important
- cluster will be broken between step 1 and restarting corosync everywhere
- allow a minute for cluster to recover
- plan for possible vm/container downtime

ref: https://forum.proxmox.com/threads/change-ip-of-cluster-node.106676/post-459672

#self-hosting #hypervisors #proxmox #ip 