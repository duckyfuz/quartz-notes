---
tags:
  - os
  - scheduler
---
### 3 main goals
1. minimise response time - elapsed time to so a job
2. maximise throughput
	- jobs per second; minimise overhead & efficient use of cpu
3. fairness
	- equitable sharing of cpu time

>[!tip] some common terminologies
>**turnaround time**: completion time - submission time
>
>**response time**: average time elapsed from submission until the first response is produced
>
>**waiting time**: time execution starts - arrival time of process
>
>**average completion time**: (total waiting time + total execution time) / num of processes

#os #scheduler 