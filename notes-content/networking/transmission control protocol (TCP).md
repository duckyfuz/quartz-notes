#Networking #TCP

**Background**
- TCP provides an effective abstraction of a reliable network running over an unreliable channel
	- retransmission of lost data, in-order delivery, congestion control & avoidance, data integrity, and more!
- optimized for accurate delivery, rather than speed
- HTTP standard does not mandate TCP as the only transport protocol - but almost all HTTP traffic is delivered via TCP due to the convenient features out of the box
### Three-Way Handshake
1. SYN: client picks a random sequence number x and sends a SYN packet, which can also include additional TCP flags & options
2. SYN ACK: server increments x by 1, picks its own random sequence number y, appends its own set of flags & options, then dispatches the response
3. ACK: client increments both x and y by 1 and completes the handshake by dispatching the last ACK packet in the handshake
after this process, the application data can begin to flow between the client & the server - the client can send a data packet immediately after the ACK packet, but the server needs to wait for the ACK packet before it can dispatch any data

- the delay imposed by the 3-way handshake is a minimum of 2xT<sub>p</sub> which makes new TCP connections expensive to create - hence why connection reuse is a critical optimization

*TCP Fast Open*
- aims to eliminate the latency penalty by allowing data transfer within the SYN packet
- limitations: max size of data payload, only allows certain HTTP requests, only works for repeat connections (require cryptographic cookie)
- TCP Fast Open also requires explicit support on the client, server, and opt-in from the application

### Congestion Avoidance & Control
- when roundtrip times > retransmission intervals, hosts will send multiple copies of each packet, filling buffers and resulting in packet loss
- this situation is *stable*, and the network will continue to operate in a degraded condition

**Flow Control**
- both sides advertise their receive window (rwnd) - each ACK packet carries the latest rwnd values for each side
	- a low rwnd window suggests to the other side that they should reduce the data flow rate
- when Bandwidth-Delay Product (BDP) is high, rwnd needs to be high to get optimal performance

**Slow Start**
- server initializes a new congestion window (cwnd) variable per TCP connection - is not advertised or exchanged between the sender or receiver
	- cwnd is the server side limit for the amount of data the sender can have in transit before receiving an ACK from the client
- max amount of data "in flight" is min(rwnd, cwnd)
- start slow (cwnd = 10, etc) and double it for every roundtrip
- not an issue for large streaming downloads, but for many HTTP connections, which are short & bursty, it is not unusual for the data transfer to finish before the max window size is reached - performance is usually limited by the RTT between client & server

 *Slow Start Restart (SSR)*
 - TCP also implements SSR, which resets the congestion window of a connection after it has been idle for some time - rationale: network conditions may have changed
 - generally recommended to disable SSR on the server to improve performance of long-lived HTTP connections

**Congestion Avoidance**
- TCP is designed to use packet loss as a feedback mechanism to help regular its performance
- slow-start initializes the connection with a conservative window, and for every RT, doubles the amount of data "in flight" until (1) it exceeds the receiver's flow-control window, (2) a system-configured congestion threshold (ssthresh) window, or (3) when a packet is lost
	- after which, the congestion avoidance algorithm takes over
- once the congestion window is reset, congestion avoidance specifies its own algorithms to grow the window to minimize further loss - resets when another packet is lost
	- leads to the "sawtooth" pattern in TCP connections

**Bandwidth-Delay Product** (= BW * RTT)
- refers to the amount of data "in flight"

### Head-of-Line Blocking
- some features, such as in-order & reliable packet delivery is not always needed
- if a packet is lost en route to the receiver, all subsequent packets are held in the receiver's TCP buffer until the lost packet is retransmitted and arrives at the receiver
	- done within the TCP layer, and so the application has no visibility into the TCP retransmissions or queued packet buffers - must wait for the full sequence
	- only sees a delivery delay (known as TCP HOL blocking)
- applications that can deal with out-of-order delivery or packets loss are better served with an alternative transport, such as UDP
	- eg. every message is standalone - in-order delivery is not needed
	- eg. every message overrides the previous message - reliable delivery is not needed

### Optimizing for TCP
- in most cases, latency, not bandwidth is the bottleneck for TCP

**Tuning Server Configuration**
- increasing initial congestion window
- disabling slow-start restart
- enabling window scaling (increase max. receive window size)
- enable TCP Fast Open (send data in the SYN packet)

**Tuning Application Behavior**
- send fewer bits - eliminate unnecessary resources
- move the bits closer - use a CDN
- reuse existing TCP connections
