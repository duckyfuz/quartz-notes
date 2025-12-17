**Errors & Risks**
- deadlocks
- race conditions - when multiple threads access shared data concurrently -> undef. behavior
- starvation - when a thread is unable to gain regular access to shared resources

**Proper Synchronization**
- Mutex & Locks
- Condition Variables - acts as a flag that notifies the threads when shared resources are free
	- provides a wait-free synchronization in contrast to what mutex and locks do
- Futures & Promises
	- only viable when the thread tasks are independent of each other
- Semaphores - restrict to *x* number of threads with access to the shared resource



**Concurrency vs Parallelism**

| Characteristics      | Concurrency                                                                      | Parallelism                                                             |
| :------------------- | :------------------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| **Definition**       | Processing multiple tasks in overlapping time intervals                          | Simultaneous execution of multiple tasks on different threads           |
| **Focus**            | Making progress on more than one task at a time                                  | Performing multiple tasks at exactly the same time                      |
| **Processor Usage**  | Single processor or core at once                                                 | Multiple processors or cores at once                                    |
| **Task Interaction** | Tasks may or may not interact with each other                                    | Tasks often work independently or communicate                           |
| **Use Cases**        | Suitable for small tasks as it doesn't have overhead due to being in single core | Suitable for large tasks where thread setup overhead cost is negligible |
