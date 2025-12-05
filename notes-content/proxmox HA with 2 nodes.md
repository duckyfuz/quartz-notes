need to setup a 3rd device for quorum

1. add ssh key to DO droplet
2. `apt install corosync-qdevice` on all devices
3. `pvecm qdevice setup 146.190.x.x`