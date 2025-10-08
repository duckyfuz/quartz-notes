a memory management technique where we divide a large memory block into smaller power-of-two blocks called buddies
- when a request comes, we split until a suitable size is reached
- when memory is freed, we check the buddy & remerge if possible
as a result, memory reuse is fast and reduces fragmentation
- internal fragmentation is still an issue