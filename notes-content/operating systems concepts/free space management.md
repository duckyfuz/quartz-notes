---
tags:
  - os
---
there are 4 main approaches to managing free space:
1. bitmap or bit vector:
	- simple to understand & finding the first free block is efficient
	- need to iterate through all blocks (expensive!)
2. linked list
	- dynamic allocation is easy
	- I/O is required for free space list traversal

> [!warning] we cannot store the LL in memory since we cannot ensure integrity in the event of a system crash or power failure

3. boundary tags
	- adjacent free blocks are merged during deallocation to reduce fragmentation
	- overhead in storing tag information + added complexity
4. free list
	- fast allocation as free blocks are known upfront
	- extra memory needed to store the list + fragmentation over time

#os