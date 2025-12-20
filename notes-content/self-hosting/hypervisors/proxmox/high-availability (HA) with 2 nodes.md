---
tags:
  - self-hosting
  - hypervisors
  - proxmox
  - high-availability
---
usually we have at least 3 devices (and odd number of devices) for quorum
- prevents a "split-brain" scenario

1. add ssh key to vps
2. `apt install corosync-qdevice` on all devices
3. `pvecm qdevice setup 146.190.x.x`

#self-hosting #hypervisors #proxmox #high-availability 