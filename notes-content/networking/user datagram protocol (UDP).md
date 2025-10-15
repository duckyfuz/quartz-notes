---
tags:
  - Networking
  - UDP
---
### non-services
1. no guarantee of message delivery
2. no guarantee of order of delivery
3. no connection state tracking
4. no congestion control / flow control

### UDP and NATs
*connection-state timeouts*
- tcp has a well-defined protocol state machine - the middlebox can observe the entries and remove the routing entries as needed
- udp does not - the translator needs to figure out when to drop the translation record (and is usually expired on a timer)
	- there is a need to introduce bidirectional keepalive packets to reset this timer for all NAT devices in the path

> [!warning] many NAT devices apply similar timeout logic to both TCP and UDP sessions
> which is why in some cases, bidirectional keepalive packets are also needed for TCP

*NAT traversal*
- there might even be issues with establishing a UDP connection at all - especially for P2P applications which need to act as both the server and the client
- (1) the internal client is unaware of its public ip, and (2) the packet that arrives at the public IP of a NAT must have a destination port and an entry in the NAT table (unlikely if the receiver has yet to send anything out)
- to resolve this issue, we have 3 techniques: (1) TURN, (2) STUN, and (3) ICE

**TURN** (traversal using relays around NAT)

uses a public relay to shuttle data between peers
- both clients begin their connections by sending an allocate request to the same TURN server, followed by permissions negotiation
- after negotiation, both peers communicate by sending data to the TURN server, which relays it to the other peer

**STUN** (session traversal utilities for NAT)

allows the host application to discover the presence of a NAT on the network and discover the associated public IP and port tuple for the current connection
- requires assistance from a well-known, 3rd-party STUN server that resides on the public network
- this also defines a simple mechanism for keepalive pings to keep the NAT routing entries from timing out

**ICE** (interactive connectivity establishment)

a protocol, and a set of methods, that seek tp establish the most efficient tunnel between participants: direct connection where possible (using STUN), and fallback to TURN if needed

### Optimizing for UDP
- applications will likely have to reimplement some features from TCP from scratch

**guidelines for using UDP**
- application _must_ tolerate a wide range of Internet path conditions.
- application _should_ control rate of transmission.
- application _should_ perform congestion control over all traffic.
- application _should_ use bandwidth similar to TCP.
- application _should_ back off retransmission counters following loss.
- application _should not_ send datagrams that exceed path MTU.
- application _should_ handle datagram loss, duplication, and reordering.
- application _should_ be robust to delivery delays up to 2 minutes.
- application _should_ enable IPv4 UDP checksum, and _must_ enable IPv6 checksum.
- application _may_ use keepalives when needed (minimum interval 15 seconds).

#Networking #UDP