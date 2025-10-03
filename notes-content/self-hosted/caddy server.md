- installing this package automatically starts and runs Caddy as a [systemd service](https://caddyserver.com/docs/running#linux-service) named `caddy`
```
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

- edit configuration: `sudo nvim /etc/caddy/Caddyfile`
- verify service is running: `systemctl status caddy` 
	- read full logs: `journalctl -u caddy --no-pager | less +G`
- after making changes: `sudo systemctl reload caddy`
- stop the service: `sudo systemctl stop caddy`

>[!tip] the Caddy process runs as the 'caddy' user
> meaning that `$HOME` is set to `/var/lib/caddy`
> - default data storage location (certs, state info) will be store in `/var/lib/caddy/.local/share/caddy`
> - default config storage location (for the `caddy-api` service) will be in `/var/lib/caddy/.config/caddy`

##### more details
- https://caddyserver.com/docs/running#using-the-service