---
tags:
  - DNS
  - UDP
---
- DNS is not inherently secure (usually via [[user datagram protocol (UDP)]])
- susceptible to attacks such as MITM, DNS tunneling, and spoofing
- more secure alternatives such as [[DNS over HTTPS (DoH)]] & [[DNS over TLS (DoT)]] exist
##### configuring DoH / DoT (mac)
- system setting > DNS domains -> add `1.1.1.1` and `1.0.0.1` (cloudflare DoH)
- `arc://settings/privacy` -> Use Secure DNS ✅

#### DNS to IP r/s
- domain to IP can be seen as a one to many r/s (or many to many if you consider that multiple domains can map to the same IP)
	- eg. on CF, we can add multiple A records to a single domain (or AAAA records for IPv6)
- why? (1) load balancing, (2) redundancy, (3) region-specific CDNs

#### DNS resolving
there are 4 servers involved - a recursive resolver, a root nameserver, a TLD nameserver, and an authoritative nameserver
1. when you query for a url (eg. notes.kenf.dev), it passes through the ==**DNS resolver**==, which acts as a middleman between your computer and the other three DNS servers
2. the DNS resolver first contacts a ==**root nameserver**== to find addresses of the `.dev`  TLD servers
3. the ==**TLD server**== then contacts the `kenf` authoritative server
4. the ==**authoritative nameserver**== translates the domain name into an IP address
