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
