---
tags:
  - os
  - processes
---
**TASK_RUNNING**
- task is running on a cpu or awaiting execution

**TASK_INTERRUPTABLE**
- task is sleeping but can be awoken by an interrupt

**TASK_UNINTERRUPTABLE**
- tasks is sleeping - any interrupt delivered to it will not change it's state
- more details [here](https://stackoverflow.com/a/223727), TLDR: 
	- some syscalls, (eg. `read()`) is interruptible - it takes a long time (seconds); when it receives SIGTERM, the syscall exits prematurely -> this early return enables the user space code to immediately respond to the signal
	- some syscalls cannot be interrupted this way - if the syscall stalls for some reason, the process can indefinitely remain in this unkillable state

**\_\_TASK_STOPPED**
- task is stopped 

**\_\_TASK_TRACED**
- task is stopped by a debugger

![[task_states_diagram.png]]

#os #processes 