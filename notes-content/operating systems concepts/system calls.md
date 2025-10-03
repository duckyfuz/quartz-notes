help i am not kernel pls run for me

examples: `getpid()`, `write()` (which is called by `printf()`)

**how it works:**
- user program invokes the library call
- library call places the system call number in a designated location (eg. register)
- library call executes a special instruction to switch modes (user -> kernel)
	- TRAP instruction
- now in kernel mode, the appropriate system call handler is determined (using the system call number)
	- similar to vectored interrupt
- system call handler is executed -> system call handler ended -> library call returns to user program