---
tags:
  - os
---
why is external fragmentation a thing 😔
#### best fit
chooses the **smallest** block that is large enough to accommodate the new process
- wastes the least amount of space in the chosen block
- but can leave behind many tiny, unusable memory blocks
#### worst fit
finds the **largest** available free block for the new process
- leftover portion of the block is likely to be large enough to be useful for another process
- but tends to break up large, contiguous memory blocks that might be needed later for a large process
#### first fit
scans the memory from the beginning and chooses the **first** free block it finds that is large enough
- much faster than best or worst fit
- but can lead to a cluster of small, unusable blocks at the beginning of memory, forcing the algorithm to scan past them for future allocations
#### next fit
first fit, but it starts its search from where the previous search left off, rather than from the beginning of memory
- spreads memory usage more evenly and avoids constantly allocating from the start of memory (generally faster than first fit)
- may skip over a suitable block at the beginning of memory

> [!question] is next fit always better than first fit?
> **next fit** is almost always faster than first fit
> > [!info] however, **first fit** tends to be more efficient with memory usage and creates less fragmentation over the long run
> > **FF** leaves a large, contiguous free block at the end of memory, which can be valuable if a very large process needs to be allocated later
> > 
> > **NF** spreads allocations more evenly throughout memory, which can quickly break up large free blocks all over memory, making it harder to find a single large enough block when one is needed

#### segregated lists
maintains separate lists of free blocks, organized by size categories - only needs to search the list corresponding to that size range
#### buddy allocation
a memory management technique where we divide a large memory block into smaller power-of-two blocks called buddies
- when a request comes, we split until a suitable size is reached
- when memory is freed, we check the buddy & remerge if possible
as a result, memory reuse is fast and reduces fragmentation
- internal fragmentation is still an issue

> [!warning] the most pressing issue with the approaches above is the lack of **scaling**
> essentially, searching lists is quite slow - advanced allocators use more complex data structures, trading simplicity for performance
> - eg. balanced binary trees, splay trees, or partially-ordered trees
> > [!tip] a heap is a type of partially ordered tree, but with additional constraints
> > - also a complete binary tree, meaning all levels are filled except possibly the last, which is filled from left to right


#os