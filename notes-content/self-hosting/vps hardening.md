i get all my information from here: https://www.youtube.com/watch?v=40SnEd1RWUU
\*some small changes made though

```zsh
sudo apt update && sudo apt ujpgrade -y
sudo apt install -y curl wget ufw fail2ban ca-certificates gnupg

sudo adduser kenf
sudo usermod -aG sudo kenf
```

then update sshd_config
```
# /etc/ssh/sshd_config
Port 2222
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
ChallengeResponseAuthentication no
UsePAM yes
X11Forwarding no
AllowUsers kenf
MaxAuthTries 3
LoginGraceTime 30
```

```zsh
sudo sshd -t && sudo systemctl enable ssh
sudo systemctl restart ssh
```

```zsh
ssh -p 2222 kenf@SERVER_IP
sudo ufw allow 2222/tcp
sudo ufw enable

sudo systemctl enable --now fail2ban
```

```
# /etc/fail2ban/jail.local
[sshd]
enabled = true
port = 2222
maxretry = 3
bantime = 1h
findtime = 10m
```

```zsh
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure unattended-upgrades
```

```
# /etc/apt/apt.conf.d/50unattended-upgrades
"${distro_id}:${distro_codename}-security";
```

```zsh
sudo timedatectl set-timezone Asia/Singapore
sudo systemctl enable --now systemd-timesyncd
```

```zsh
sudo apt install -y haveged # better entropy
```
