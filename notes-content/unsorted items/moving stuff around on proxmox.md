context: i set up proxmox (2 nodes) with lvm instead of zfs
- hence, no replication
- how can I allow zfs (but without buying two more ssds?)

resize lvm-thin -> create zfs -> move containers (and vms) over

something like this:
```
# First, make sure no processes are using the thin pool
lvchange -an pve/data

# Remove the thin pool (this is safe IF it's 0% used)
lvremove pve/data

# Create new thin pool with 64G data and 64M metadata
lvcreate -L 64G --thinpool data pve
lvresize --poolmetadatasize 64M pve/data # might not be needed (default)

# Create ZFS pool logical volume
lvcreate -L 300G -n zfs-pool pve

# Create ZFS pool
zpool create -f tank /dev/pve/zfs-pool

# Set optimal ZFS properties
zfs set compression=lz4 tank
zfs set atime=off tank
zfs set xattr=sa tank
zfs set dnodesize=auto tank

# Add ZFS storage to Proxmox
pvesm add zfspool tank -pool tank

# Verify storage configuration
pvesm status

# Check status
lsblk
lvs
zpool status
```

moving lxc: `pct move 102 rootfs --storage tank`
- beforehand, can run `pct config 102` to see where the data is - eg. `rootfs`

moving vm: `qm disk move 103 scsi0 --storage tank`
- beforehand, can run `qm config 103` to see where the data is - eg. `scsi0`

> [!warning] remember to remove the original disc in \<vmid\> > resources afterwards

