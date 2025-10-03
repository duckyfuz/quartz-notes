### Clones
- most web services are hidden behind a load balancer
	- we need to ensure that users always get the same results of his request back, independent of what server he 'landed on'
		- 1st golden rule: every server contains the same codebase and does not store user-related data, like sessions, on local disc or memory
- sessions need to be stored in a centralized data store which is accessible to all application servers - can be an external DB or an external persistent cache

### Databases
- path 1: stick with MySQL - (1) use master-slave replication and upgrade master server by adding more RAM, (2) [[sharding]], (3) [[denormalization]], (4) [SQL tuning](https://github.com/donnemartin/system-design-primer?tab=readme-ov-file#sql-tuning)
- path 2: denormalize from the start - no more JOINS
	- use MySQL like a NoSQL database, or use a easier to scale NoSQL DB
	- joins will have to be done in the application code
			- database requests will still get slower after time - need to introduce a cache

>[!tip] further exploration: federation
>- split up databases by function - eg. forums, users, products
>- smaller databases have more data that can fit in memory, which results in more cache hits due to improved cache locality
>- however, federation is not effective if the schema requires large functions or tables
>	- joining data from two databases is more complicated with a [server link](https://stackoverflow.com/questions/5145637/querying-data-by-joining-two-tables-in-two-database-on-different-servers)

### Cache
- with cache, we mean in-memory cache like Redis
	- don't do file-based caching! makes cloning and auto-scaling a pain
- there are 2 main patterns of caching data
	- old: caching db queries
		- how to expire entries? it's hard to delete a cached result when we cache a complex query - one table cell changes -> need to delete all cached queries which may include the cell
	- new: cached objects
		- after "assembling" the data, cache the data in the cache
		- also makes async processing possible

### Asynchronism
- Async #1: "bake the cakes at night and sell them in the morning"
	- can be used to turn dynamic content into static content
		- eg. pages built w. a massive framework or CMS can be pre-rendered and locally stored as static HTML file on every change
	- can schedule with a cronjob!
- Async #2: "handling special cake requests"
	- cannot foresee these types of requests
	- sends the job to a queue - signal to the user that the job is in work
		- frontend constantly checks for a "job is done" signal (very simplified eg!!)