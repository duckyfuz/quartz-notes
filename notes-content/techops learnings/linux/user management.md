---
tags:
  - techops
  - linux
---
```bash
# ubuntu server
sudo adduser <username>
sudo usermod -aG sudo <username>

# alpine
apk add sudo
NEWUSER='yourUserName'
adduser -g "${NEWUSER}" $NEWUSER
echo "$NEWUSER ALL=(ALL) ALL" > /etc/sudoers.d/$NEWUSER && chmod 0440 /etc/sudoers.d/$NEWUSER

# rockylinux
sudo adduser <username>
passwd <username>
sudo usermod -aG wheel <username> # take note that the usergroup is wheel


id <username> # verify changes
```

#### switching users
```bash
machinectl shell --uid <username> # provides a cleaner, fully isolated user session for systemd management, unlike su

sudo su
su <username>
```

#techops