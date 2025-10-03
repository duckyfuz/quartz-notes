- distributes data across different databases such that each database can only manage a subset of the data
	- use a hashing function to determine which shard each row belongs to
	- can also use initials, geographical location, etc
- similar to the results of federation, sharding results in less read and write traffic, less replication, and more cache hits
- index size is also reduced, which generally improves performance with faster queries

##### disadvantages
- application logic needs to be updated to work with shards = complex sql queries
- data distribution can become lopsided - need a good hashing function / rebalancing