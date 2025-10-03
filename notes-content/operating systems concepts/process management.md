- process is abstracted into these components: (1) memory context, (2) hardware context, (3) os context, (4) process control block & process table

- memory context: code, data
- hardware context: registers, pc
- os context: process properties, resources used
	- eg. PID, process state

**types of registers**
- general purpose register (GPR)
- program counter (PC)
- stack pointer (FP)
- program status word (PSW)
- and others...



**memory segments**
- core segments
	- text / code: machine instructions loaded from the binary
	- data: global / static variables with explicit initial values
- stack: per-thread LIFO area holding call frames: return addresses, saved registers, parameters, and automatic (local) variables; grows/shrinks with calls/returns and is reclaimed automatically on function exit.
- heap: dynamically allocated region for objects whose lifetimes are managed at runtime; requests come from allocators (e.g., new/malloc) and are released explicitly by the program or GC in managed runtimes.