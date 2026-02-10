---
tags:
  - self-hosting
  - hypervisors
  - proxmox
  - high-availability
---
usually we have at least 3 devices (and odd number of devices) for quorum
- prevents a "split-brain" scenario

1. add ssh pub key (from any proxmox node) to vps
2. `sudo apt update && sudo apt install corosync-qnetd` on vps
3. `sudo systemctl enable corosync-qnetd && sudo systemctl start corosync-qnetd` on vps

4. `apt install corosync-qdevice` on all proxmox nodes
5. `pvecm qdevice setup 146.190.x.x`

#self-hosting #hypervisors #proxmox #high-availability 