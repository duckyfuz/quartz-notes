---
tags:
  - os
  - processes
---
we want to create processes FAST!

tricks to make creating processes fast:
	- copy-on-write (COW)
- lightweight process creation (uses `kernel_clone()`)

>[!tip] other interesting syscalls
>`man clone` - not fork! can write to the same virtual mem
>
> `man vfork` - similar to `clone()`, but the parent will block until the child exits or performs `execve()`
> - `execve()` loads  a new executable and rewrites the memory space

#os #processes