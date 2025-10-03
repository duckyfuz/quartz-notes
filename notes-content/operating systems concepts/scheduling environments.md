main criteria: fairness & balance
- fairness: fair share of CPU time, no starvation
- balance: all parts of the computing system should be utilized

two types of policies: 
- non-preemptive (cooperative)
	- process stays schedules until it blocks / give up CPU voluntarily
- preemptive

#### batch processing
- jobs with similar needs are queued and run in groups without user interaction, emphasizing turnaround and resource efficiency over immediacy
#### interactive (or multiprogramming)
- criteria: response time (req -> res) & predictability (variation in response time)
#### real time processing
- essentially, tasks have deadlines