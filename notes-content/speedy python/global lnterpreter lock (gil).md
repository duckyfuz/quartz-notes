**Background**
- is essentially a mutex that allows only one thread to hold control of the Python interpreter
- can be a performance bottleneck in CPU-bound and multi-threaded code

**Why GIL?**
- python uses reference counting for memory management 
- essentially, the reference count variable needs protection from race conditions where two threads increase / decrease the value simultaneously
	- or, even worse, release the memory while a reference to the object still exists
- we can keep the reference count variable safe by adding locks to all data structures that are shared across threads
	- this however means that multiple locks will exist, which can cause Deadlocks
	- performance might also be impacted by the repeated acquisition and release of locks
- GIL is a single lock on the interpreter itself - execution of any Py bytecode requires acquiring the interpreter lock
- GIL is not the only solution to this problem - we can use other methods of garbage collection
	- there will then be a need to compensate for the loss of single threaded performance benefits of GIL via other performance boosting features (eg. JIT compilers)

- Python was around since before OS had the concept of threads
	- designed to be easy to use to make development easier 
- extensions were being written for existing C libraries whose features were needed in Python
	- to prevent inconsistent changes, these C extensions required a thread-safe memory management (which GIL provides)
	- GIL is simple to implement - also provides a performance increase to single-threaded programs as only one lock needs to be managed

**Impact of GIL** (on CPU-bound and I/O-bound program)
- a program whose threads are entirely CPU-bound, e.g., a program that processes an image in parts using threads, would not only become single threaded due to the lock but will also see an increase in execution time
- the GIL does not have much impact on the performance of I/O-bound multi-threaded programs as the lock is shared between threads while they are waiting for I/O

**Why hasn't the GIL been removed yet?**
- removing the GIL breaks existing C extensions
- there are other solutions to the problem that GIL solves, but some of them decrease the performance of single-threaded and multi-threaded I/O programs and some of them are just too difficult

**What changed in Python3?**
- Python2's GIL was known to starve the I/O-bound threads by not giving them a chance to acquire the GIL from CPU-bound threads
	- because of a mechanism built into Python that forced threads to release the GIL **after a fixed interval** of continuous use and if nobody else acquired the GIL, the same thread could continue its use
	- most of the time the CPU-bound thread would reacquire the GIL itself before other threads could acquire it
- Python3 has a mechanism that looks at the number of GIL acquisition requests by other threads that got dropped
	- no longer allows the current thread to reacquire GIL before other threads got a chance to run

**Dealing with GIL**
- use multiprocessing instead - each Py process gets its own Py interpreter and memory space so GIL is not a problem
	- multiple processes are however, heavier than multiple threads
- use another interpreter implementations