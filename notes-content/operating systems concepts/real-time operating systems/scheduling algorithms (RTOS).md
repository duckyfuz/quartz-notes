refer to [[scheduling environments]] for context
#### round robin (preemptive FCFS)
- FIFO queue
- runs until time quantum elapsed, or gives up CPU voluntarily, or task blocks
choice for time quantum is important - switching context takes up overhead

#### priority based
- select task with highest priority value
- has preemptive & non-preemptive version
low priority processes can starve -> consider using multi-level feedback queues (MLFQ)



### algorithms for RTOS
- tasks are characterized by $P_i$ (task period) and $C_i$ (running time of task per period)
#### fixed priority scheduling
#### rate monotonic scheduling (RMS)
- is the optimal assignment of priorities
#### earliest deadline first scheduling (EDF)