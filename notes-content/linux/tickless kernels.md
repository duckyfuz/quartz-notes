traditionally, the kernel would use a timer interrupt (the "tick") to wake up the CPU at a fixed frequency (e.g., 100, 250, or 1000 Hz) to check for tasks and perform load balancing

a tickless kernel replaces this with **on-demand interrupts**, allowing idle CPUs to stay in low-power states longer and only be interrupted when a new task needs to be processed or a timer event is due

#### but why?
- **power efficiency:** idle CPUs can remain truly idle, significantly reducing power consumption

#### however,
- the trade-off for increased idle time and reduced power consumption is a potential increase in latency for certain operations, as the system may take longer to react to events that would normally trigger an interrupt