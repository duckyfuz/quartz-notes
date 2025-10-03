#browser

**Background**
- the networking stack of a modern browser is much more than a simple socket manager
- features its own optimization criteria, APIs, and services

### Connection Management & Optimization
- sockets are organized in pools, which are grouped by origin - each pool enforces its own connection limits & security constraints
- pending requests are queued, prioritized, and then bound to individual sockets in the pool
	- unless the server intentionally closes the connection, the same socket can be automatically reused across multiple requests
	- Origin: a triple of application protocol, domain name, & port number (eg. http, www.example.com, 80)
	- Socket Pool: a group of sockets belonging to the same origin - usually restricted to 6
- automatic socket pooling automate TCP connection reuse, among other benefits

### Network Security & Sandboxing
- deferring management of individual sockets also allows the browser to sandbox and enforce a consistent set of security & policy constraints on untrusted application code

### Resource & Client State Caching
- browser automatically evaluate caching directives on each resource,
	- revalidates expired resources when possible, and 
	- manages the size of cache and resource eviction
	- what WE need to do is to ensure that our servers are returning the appropriate cache directives - Cache-Control, ETag, Last-Modified
- browser also provides authentication, session, and cookie management
	- deferring session state management to the browser allows us to share an authenticated session across multiple tabs or browser windows, and vice versa; a sign-out action in a single tab will invalidate open sessions in all other open windows

### Application APIs & Protocol
- there is no one best protocol or API - every non-trivial application will require a mix of different transport based on their requirements
![[Screenshot 2025-02-17 at 10.33.41.png]]
- the above comparison is incomplete! but serves as an illustration of the differences among each protocol