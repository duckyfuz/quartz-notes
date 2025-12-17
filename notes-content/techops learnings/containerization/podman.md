---
tags:
  - techops
  - containerization
  - podman
---
#### adding podrunner user & creating basic dirs
```bash
useradd podrunner
loginctl enable-linger podrunner # allows the user's processes to continue running after the user logs out or the system reboots

machinectl shell --uid podrunner # provides a cleaner, fully isolated user session for systemd management, unlike su

mkdir -p ~/.config/containers/systemd
mkdir ~/containers/<podname>
```

#### general command for debug
```bash
systemctl --user daemon-reload
systemctl --user list-unit-files --no-pager |grep -v 'static\|disabled'
systemctl --user cat <podname>
systemctl --user enable --now podman-auto-update

/usr/libexec/podman/quadlet --dryrun
/usr/lib/systemd/system-generators/podman-system-generator --user --dryrun

# as root:
journalctl -f _SYSTEMD_UNIT=<podname>.service + SYSLOG_IDENTIFIER=<podname>
```

>[!tip] how can I debug pods with logs?
> - start a tmux session under root - start `journalctl -f _SYSTEMD_UNIT=<podname>.service + SYSLOG_IDENTIFIER=<podname>`
> - create another tmux window for `machinectl shell --uid podrunner`

#techops #containerization #podman 