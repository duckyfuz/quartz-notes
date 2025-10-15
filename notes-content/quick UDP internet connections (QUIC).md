---
tags:
  - Networking
  - UDP
  - QUIC
---
### why is QUIC quick
a Layer 4 protocol that uses another Layer 4 protocol (UDP) as its foundation to create a new, more powerful transport service
- the transport layer protocol of choice for HTTP/3

> [!info] QUIC uses UDP (port 443), so the widespread adoption of HTTP/3 (and by association QUIC) requires companies worldwide to stop blocking UDP
> - UDP is often blocked by firewalls and networks for security and performance reasons, including its lack of reliability, congestion control, and built-in authentication

a key difference between QUIC and UDP is that QUIC features congestion control
- QUIC's congestion control runs in user-space, not in the OS kernel like traditional TCP
- allows updates to the congestion control algorithms without needing an OS update

#### "solving" HOL blocking (and some history)
HTTP/2 introduces a binary framing layer between the high-level HTTP semantics (like verbs and headers) and the underlying TCP connection
- each request-response pair is assigned to its own independent **stream** - a single TCP connection can have multiple streams open simultaneously
- each stream is broken down into smaller chunks of data called **frames**, and tagged with the ID of the stream it belongs to
- HTTP/2 interleaves frames from different streams (multiplexing) over the single TCP connection, and the receiving end then reassembles the frames into their respective streams
	- in doing so, we don't have to wait for ITEM1 to be received before receiving ITEM2
QUIC takes the **stream multiplexing** from HTTP/2 and moves it from the application layer down to the transport layer
- ie. QUIC packet containing data from StreamA, StreamB, StreamC is dropped -> StreamD is not blocked

> [!warning] does it really help?
> unfortunately, most of the latency (usually) incurred is due to the handshake from HTTPS, not HOL blocking - performance gains (from this) is usually minimal
> - unless you drop a lot of packages!

**there are other benefits of QUIC that is not mentioned here** (eg. built in TLS1.3)

#Networking #UDP #QUIC 