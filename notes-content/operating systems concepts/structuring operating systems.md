**monolithic OS**
- kernel is one big special program
- **advantages**: well understood & good performance
- **disadvantages**: components are highly coupled and usually devolves into complicated internal structure
- is the traditional approach taken by most unix variants, windows NT/XP

**microkernel OS**
- kernel is very small and clean - only provides basic and essential facilities
	- eg. inter-process communication, address space management, thread management
- higher level services are built on top of basic facilities
	- run as server processes outside of the OS (run in user mode)
	- use IPC to communicate
- **advantages**: more robust and extendible - there is better isolation and protection between kernel and high level services
- **disadvantages**: lower performance

