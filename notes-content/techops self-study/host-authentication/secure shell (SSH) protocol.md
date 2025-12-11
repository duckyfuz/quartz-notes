---
tags:
  - techops
  - host-authentication
  - ssh
---
### client-side
#### generating ssh keys
```bash
ssh-keygen -t ed25519 -f ~/.ssh/my_server_key -C "comment here"
```
#### copy public key to server
```bash
ssh-copy-id username@server_ip
# Specify custom key
ssh-copy-id -i ~/.ssh/my_server_key.pub username@server_ip

# manual copy - add to ~/.ssh/authorized_keys
pbcopy < ~/.ssh/my_server_key.pub # macOS
xclip -sel clip < ~/.ssh/id_ed25519.pub # linux
cat ~/.ssh/id_ed25519.pub | clip.exe # windows WSL
```

> [!warning] ensure `~/.ssh/authorized_keys` has `- rw- --- ---` permissions (`600`)
> - note: first dash represents the file type (ordinary file, directory, etc)

#### testing the connection
```bash
# Test with verbose output
ssh -v username@server_ip
# Test with specific key
ssh -i ~/.ssh/my_server_key username@server_ip
```
#### `~/.ssh/config` convenience edits
```~/.ssh/config
Host myserver
	HostName server.example.com
	User username
	IdentityFile ~/.ssh/personal_server
	Port 22
```
- allows us to use `ssh myserver` instead of specifying `username@ip`
### using a ssh agent
```bash
eval "$(ssh-agent -s)" # start agent
ssh-add ~/.ssh/id_ed25519 # add key to agent
ssh-add -t 8h ~/.ssh/id_ed25519 # expires in 8 hours
ssh-add ~/.ssh/id_ed25519 --apple-load-keychain # add passphrase to apple keychain

ssh-add -l # list loaded keys
ssh-add -d ~/.ssh/id_ed25519 # remove specific key
ssh-add -D # remove all keys
```
#### auto start SSH agent
```bash
# add to ~/.bashrc or ~/.zshrc
if [ -z "$SSH_AUTH_SOCK" ]; then
eval "$(ssh-agent -s)" > /dev/null
ssh-add ~/.ssh/id_ed25519 2>/dev/null # or: add IdentityFile to ~/.ssh/config
fi
```

### server-side
#### `/etc/ssh/sshd_config` noteworthy configs
```/etc/ssh/sshd_config
Port 22

PermitRootLogin no
PasswordAuthentication no
ChallengeResponseAuthentication no
UsePAM no

PubkeyAuthentication yes

KbdInteractiveAuthentication no # Disable keyboard-interactive
AuthenticationMethods publickey # Only allow public key auth
```
#### firewall settings for double-checking
```bash
# Allow SSH through firewall
sudo ufw allow ssh
sudo ufw allow 2222/tcp # for custom port:
```

### misc info - ssh on alpine
> [!warning] alpine does not come with sshd by default
> ```
> apk add openssh
> rc-update add <service_name> default
> rc-service sshd start
> ```

#techops #host-authentication #ssh 