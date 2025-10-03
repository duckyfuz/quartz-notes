**Background**
- enables bidirectional, message-oriented streaming of text and binary data
	- closest API to a raw network socket in the browser
- abstracts the complexity behind an API and provides some additional services
	- connection negotiation and same-origin policy enforcement
	- interoperability with existing HTTP infrastructure
	- message-oriented communication and efficient message framing
	- subprotocol negotiation and extensibility
- the application must account for missing state management, compression, caching, and other services otherwise provided by the browser

**WS and WSS URL Schemes**
- the WebSocket resource URL uses its own custom scheme - ws (eg. ws://example.com/socket) for plain-text communication, and wss then an encrypted channel (TCP + TLS)
- while the primary use case for the WebSocket protocol is to provide an optimized bi-directional communication channel between applications running in the browser and the server, it can be used outside the browser and can be negotiated via a non-HTTP exchange

https://hpbn.co/websocket/