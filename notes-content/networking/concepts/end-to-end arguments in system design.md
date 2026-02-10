Citation: J. H. Saltzer, D. P. Reed, and D. D. Clark. 1984. End-to-end arguments in system design. ACM Trans. Comput. Syst. 2, 4 (Nov. 1984), 277–288. https://doi.org/10.1145/357401.357402

**Background**
- these arguments suggest that functions placed at low levels of a system may be redundant or of little value when compared with the cost of providing them at that low level
- lower-level implementations lack application-specific knowledge, leading to redundancy
	- lower-levels may only provide performance optimizations, while ultimate correctness must be enforced by endpoints

**Performance Aspects**
- it's too simplistic to conclude that lower levels should play no part in obtaining reliability
	- communication system is too unreliable -> frequent retries following failure of its end-to-end checksum
	 - communication system is beefed up with internal reliability measures -> performance costs, in the form of bandwidth lost to redundant data and delay added by waiting for internal consistency checks to complete before delivering the data
 - performing a function at a low level may be more efficient, if the function can be performed with a minimum perturbation of the machinery already included in the low-level subsystem
	 - but the low-level subsystem is common to many applications, so those applications that do not need the function will pay for it anyways 
	 - and the low-level subsystem may not have as much information as the higher levels, so it cannot do the job as efficiently

### Other End-To-End Arguments
**Delivery Guarantees**
- while ACKs can be useful within the network as a form of congestion control, it's not very helpful to the applications using the net
	- knowing that the message was delivered is not very important
	- what's important is knowing that the target host acted on the message
		- perhaps disaster struck after message delivery but before completion of the action requested by the message
- another strategy would be to make the target host sophisticated enough that when it accepts delivery of a message it also accepts responsibility for guaranteeing that the message is acted upon by the target application
	- e2e ACKs is still required for applications in which the action requested of the target host can only be done if similar actions requested of other hosts are successful
		- requires a two-phase commit protocol, which is a sophisticated e2e ACK
	- if the target application may either fail or refuse to do the requested action, ie a NACK is possible, an e2e ACK is still a requirement

**Secure Transmission of Data**
- the argument here is threefold
	- (1) if the data transmission system performs encryption and decryption, it must be trusted to manage securely the required encryption keys
	- (2) the data will be in the clear and thus vulnerable as it passes into the target node and is fanned out to the target application
	- (3) the authenticity of the message must be still be checked by the application
- if the application performs e2e encryption, it obtains its required authentication check, can handle key management to its satisfaction, and the data is never exposed outside the app
	- hence there is no need for the communication subsystem to provide for automatic encryption of all traffic
- automatic authentication of traffic may be used to ensure that no misbehaving user or application platform deliberately transmit information that should not be exposed
	- this is however a different requirement from authenticating access rights of a system user to specific parts of the data
	- can be unsophisticated - the same key can be used by all hosts, with frequent changes of the key
- the use of encryption for application level authentication and protection is complementary - neither mechanism can satisfy both requirements completely

**Duplicate Message Suppression**
- messages may be delivered twice, typically as a result of time-out-triggered failure detection and retry mechanisms operating within the network
- the network can provide the function of watching for and suppressing such messages, or it can simple deliver them
	- however, the application itself may accidentally originate duplicate requests, in its own failure/retry procedures
		- these application level duplications look like different messages to the communication system, so it cannot suppress them
		- suppression must be handles by the application itself with knowledge of how to detect its own duplicates
- if the application has to have a duplicate-suppressing mechanism anyways, that mechanism can also suppress duplicates generated inside the communication network

**Guaranteeing FIFO Message Delivery**
- ensuring that messages arrive at the receiver in the same order they are sent is another function usually assigned to the communication subsystem
- however, a distributed application in which one node can originate requests that initiate actions at several sites cannot take advantage of the FIFO ordering property to ensure that the actions requested occur in the correct order - an independent mechanism at a higher level than the communication subsystem must control the ordering of actions

**Transaction Management**
- we have now applied the e2e argument in the construction of the SWALLOW distributed data storage system, where it leads to significant reductions in overhead

### Wrapping Up
- e2e arguments are often applied to error control and correctness in application systems
	- eg. a failure that could cause a single call to be lost is considered not worth providing explicit recovery for, since the caller will probably replace the call if it matters
- much of the debate in the network protocol community over datagrams, virtual circuits, and connectionless protocols is a debate about e2e arguments
	- modularity argument: prizes a reliable, FIFO sequenced, duplicate suppressed stream of data as a system component that is easy to build on, and favors virtual circuits
	- e2e argument: claims that centrally-provided versions of each of those functions will be incomplete for some applications, and those applications will find it easier to build their own version of the functions starting with datagrams