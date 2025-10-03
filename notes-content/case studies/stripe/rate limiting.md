ref: https://stripe.com/blog/rate-limiters

#### background
- sudden increases in traffic can affect the quality of your service
- rate limiting can help in the following scenarios
	- one user is responsible for a spike in traffic, and you need to stay up for everyone else
	- one user has a misbehaving script which is accidentally sending a lot of requests
		- or, intentionally trying to overwhelm your servers
	- a user sends a lot of lower-priority requests, and you want to make sure that it doesn’t affect your high-priority traffic
		- for example, users sending a high volume of requests for analytics data could affect critical transactions for other users
    - something in your system has gone wrong internally, and as a result you can’t serve all of your regular traffic and need to drop low-priority requests

#### rate limiters and load shedders
- rate limiters are used to control the rate of traffic sent or received on the network
	- viable if users can change the pace at which they hit the API endpoints without affecting the outcome
	- not viable if spacing out requests is not an option (eg. real-time events)
- during incidents (eg. if a service is operating slower than usual), there is a need to drop low-priority requests to make sure more critical ones get through (load shedding)
	- a load shedder makes decisions based on the whole state of the system rather than the user making the request
	- load shedders can help with emergencies by allowing the core part of the business working while the rest is on fire

##### request rate limiter
- restricts each user to *N* requests per second
- possible enhancement: the ability to briefly burst above the cap for sudden spikes in usage during real-time events (eg. flash sales)

##### concurrent requests limiter
- instead of "you can use the API *N* times a second", we say "you can only have *N* API requests in progress at the same time" (word is simultaneous)
- used to manage resource-intensive endpoints 
	- also reduces retry-induced load

##### fleet usage load shedder
- divide traffic into two types: critical API methods (eg. creating charges), non-critical methods (eg. listing charges)
	- stripe uses a Redis cluster to count the number of requests of each type
- reserve a portion of infrastructure for critical requests (eg. 20%)
	- any non-critical request over their 80% allocation would be rejected

##### worker utilization load shedder
- most API services use a set of workers to independently respond to incoming requests in parallel
	- last line of defense - if workers are backed up with requests, shed lower-priority traffic
	- stripe divides traffic into 4 categories: (1) critical methods, (2) POSTs, (3) GETs, and (4) test mode traffic
- number of workers with available capacity is tracked at all times - if a box is too busy to handle the request volume, it will slowly start shedding less-critical requests

> [!warning] it's important to shed and bring back traffic SLOWLY
> -  else, we will end up flapping between states

#### implementation
- stripe uses the token bucket algorithm in practice
	- every user has a bucket, and every time they make a request we remove a token from that bucket
	- implemented using Redis
- there are some important considerations when implementing rate limiters
	- hook the rate limiters into your middleware stack safely
		- if there were bugs in the rate limiting code (or if Redis were to go down), requests wouldn’t be affected - catch exceptions at all levels!!!
	- show clear exceptions to users (eg. 429, 503)
	- implement safeguard so that an admin can disable the rate limiters
		- possibly use feature flags to enable / disable rate limiters
		- set up alerts and metrics to understand how often they trigger
	- "dark launch" each rate limiter to watch the traffic they block
			- evaluate if the choice was correct and tune the %s