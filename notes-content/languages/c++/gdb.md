---
tags:
  - languages
  - cpp
  - debugging
  - gdb
---
- rmb to compile with the `-g` flag for debugging symbols!
- use `gdb ./your_program` to start it up

##### Basic Controls
- `run` (r): start the program
- `run arg1 arg2`: start with arguments
- `quit` (q): exit GDB

##### Breakpoints & Navigation
- `break main` (b): set a breakpoint at main
- `break file.cpp:42`: set at a specific line
- `info breakpoints` (i b): list all breakpoints
- `delete 1` (d): delete breakpoint #1
- `continue` (c): resume until next breakpoint
- `next` (n): step over (don't go into functions)
- `step` (s): step into functions
- `finish`: run until the current function returns

##### Inspection
- `print x` (p): show the value of `x`
- `list` (l): show the source code
- `backtrace` (bt): show the call stack (where am i?)
- `frame 1` (f): jump to frame #1 in the stack
- `info locals`: show all local variables

##### Advanced Stuff
- `watch x`: break whenever the value of `x` changes!
- `set var x = 10`: change the value of `x` while running
- `layout next`: toggle the TUI (it's actually pretty cool)
	- or use `ctrl-x a` to enter/exit TUI mode

> [!tip] if it segfaults, just type `bt` to see exactly where it died

#languages #cpp #debugging #gdb
