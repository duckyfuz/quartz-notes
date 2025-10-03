- **rule 1**: if Priority(A) >Priority(B), A runs (B doesn’t)
- **rule 2**: if Priority(A)= Priority(B), A & B run in round-robin fashion using the time slice (quantum length) of the given queue
- **rule 3**: when a job enters the system, it is placed at the highest priority (the topmost queue)
	- however, long running jobs might face starvation if there are many interactive jobs
		- and what if a long running job changes its behaviour?
	- furthermore, what if jobs attempt to game the scheduler
		- by yielding right before their time quantum ends to stay at the same priority level?
- **rule 4**: after some time period S, move all the jobs in the system to the topmost queue
	- processes are guaranteed not to starve
	- and if a CPU-bound job becomes interactive (requires I/O), the system treats it as such
	- however, we still face the issue where jobs may try to game the scheduler
- **rule 5**: once a job uses up its time allotment at a given level (regardless of how many times it has given up the CPU), its priority is reduced (i.e., it moves down one queue)


#### how should we parameterize such a scheduler?
- how many queues, how big should the time slice per queue be? how often should priority be boosted?
- some systems allow users to easily set parameters
- some systems allow user 'advice' to help set priorities
	- eg. using `nice` increase the priority of a job