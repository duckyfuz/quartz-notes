---
tags:
  - techops
  - host-authentication
---
a security mechanism that verifies and authorizes access based on the identity of the host machine rather than individual user accounts

### how does it work?
the connecting host is identified using one or more of: (1) IP address, (2) MAC address, (3) hostname / DNS name, (4) digital certificates (installed on the host), (5) SSH host keys

### how is it implemented?
1. host-based access control lists - eg.
	configured in `/etc/hosts.allow` and `/etc/hosts.deny` - controls access to network services based on IP addresses, hostnames, or domains
	and `iptables` - firewall rules based on ip addresses
2. SSH host-based authentication
	configured in `~/.ssh/known_hosts` and `/etc/ssh/ssh_known_hosts`
3. kerberos host authentication
	hosts have their own principals in Kerberos - used in enterprise environments like Active Directory
	kerberos might use [[lightweight directory access protocol (LDAP) authentication|LDAP]] as a backend
4. certificate-based authentication
	hosts present digital certificates - used in VPNs, web servers (TLS), etc

> [!warning] but can't you spoof IP / MAC addresses?
> yes! that's why host-level authentication is often used in combination with user authentication rather than as a replacement - it's particularly useful for 
> - creating trusted zones within a network
>- service accounts and daemon communications
>- environments with static IP addresses

#techops #host-authentication