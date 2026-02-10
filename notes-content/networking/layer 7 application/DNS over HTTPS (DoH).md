---
tags:
  - DNS
  - HTTPS
  - TLS
---
- DNS queries & responses are encrypted and sent via the HTTP or HTTP/2 protocols
	- uses port 443 (std. HTTPS traffic port) to wrap the DNS query in a HTTPS request
- ensures that attackers cannot forge or alter DNS traffic
##### limitations
- traffic still has to pass through an intermediary (like the DoH resolver)
	- censors can block DoH resolver itself
- the destination IP and content of the HTTPS request are still visible
	- susceptible to IP addr inspection or deep packet inspection (DPI)
- certificate pinning - if the censoring entity controls the certificate authority