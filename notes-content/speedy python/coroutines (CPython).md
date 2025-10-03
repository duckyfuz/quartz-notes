CPython uses a "stack-based" virtual machine to execute instructions - the stack is just a linear block of memory that contains data or references to data

why not use multiple processes? 
- duplicated memory use for each runtime (heap & bytecode)
- any communication between processes require serializing and deserializing data

what about multithreading?
- require a new call stack for each stack - no more duplication of the heap & bytecode
- no need to serialize data between workers - same pool of memory
- due to GIL - cannot run multiple threads at the same time
- the runtime is in charge of scheduling threads, with no insight into what they are doing
	- requires costly context switch (save execution state & restore state)
	- more likely to switch threads at the wrong time - suboptimal
	- more threads = more context switches = higher chance that task will be interrupted at critical times

hence, use coroutines! - cooperative multitasking
- need to explicitly yield control
- one shared stack of calls and one heap only!
- conceptually similar to generators - `next(gen)` to continue execution
