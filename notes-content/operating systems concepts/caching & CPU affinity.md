---
tags:
  - os
---
\*also known as CPU pinning

moving one thread to another CPU would invalidate the L1/L2 caches for the cores
- a thread to a specific core ensures it stays there, maximizing cache efficiency.

#os