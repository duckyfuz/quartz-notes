```bash
wget https://dl.rockylinux.org/pub/rocky/10/images/x86_64/Rocky-10-GenericCloud-Base.latest.x86_64.qcow2

qm create 8000 --memory 2048 --core 2 --name rocky-cloud --net0 virtio,bridge=vmbr0

qm disk import 8000 Rocky-10-GenericCloud-Base.latest.x86_64.qcow2 local-zfs

qm set 8000 --scsihw virtio-scsi-pci --scsi0 local-zfs:vm-8000-disk-0

qm set 8000 --ide2 local-zfs:cloudinit

qm set 8000 --boot c --bootdisk scsi0

qm set 8000 --serial0 socket --vga serial0
```

```bash
# ADDITIONAL STEPS FOR GUEST-AGENT
mkdir -p /var/lib/vz/snippets
vi /var/lib/vz/snippets/rocky-guest-agent.yaml
```

```yaml
#cloud-config
package_update: true
packages:
  - qemu-guest-agent

runcmd:
  - systemctl enable --now qemu-guest-agent
```

```bash
qm set 8000 --cicustom "vendor=local:snippets/rocky-guest-agent.yaml"
#qm set 8000 --cicustom "vendor=local:snippets/rocky-vendor.yaml"
qm set 8000 --agent enabled=1 # ,fstrim_cloned_disks=1
```

>[!warning] DO NOT START THE VM YET
>we should go to the Proxmox UI and configure HW and cloud-init

>[!warning] note that `cicustom` has to use vendor if we are going to set custom user params in cloud-init - else, `cicustom` will overwrite

```bash
qm template 8000

qm clone 8000 100 --name cloud-test --full
qm set 100 --ipconfig0 ip=10.0.0.100/24,gw=10.0.0.1

qm start 100
qm agent 100 ping
```

ref: https://technotim.com/posts/cloud-init-cloud-image/
