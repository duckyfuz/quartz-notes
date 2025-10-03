---
tags:
  - DNS
  - TLS
---
- typically uses port 853, while TLS/SSL usually uses port 443
	- it's a distinct connection separate from regular HTTPS traffic
- provides encryption similar to [[DNS over HTTPS (DoH)]] but with a dedicated protocol for DNS
	- suitable for applications that require secure DNS w/o the need to obfuscate traffic
