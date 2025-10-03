- is essentially a web server that centralizes internal services and provide unified interfaces to the public

#### additional benefits
- increased security - hide information about backend servers, limit number of connections per client, etc
- increases scalability and flexibility - clients only see the reverse proxy's IP (easily scale servers or change configuration)
- SSL termination - decrypt incoming requests and encrypt server responses
	- such that backend services no longer have to perform these expensive operations
	- no need to install X.509 certs on each server
- caching - return response for cached requests
	- can serve static content directly too

#### disadvantages
- single point of failure - configuring multiple reverse proxies further increases complexitys