### Big-O Notation & Amortized Analysis
- **Big-O**: Represents the upper bound (worst-case).
- **Amortized Analysis**: Average cost per operation over a sequence of operations.
    - **Example**: `vector::push_back` is $O(1)$ amortized. Most are $O(1)$, but occasionally $O(n)$ when resizing.
- **Common Classes**: $O(1) < O(\log n) < O(n) < O(n \log n) < O(n^2) < O(2^n) < O(n!)$.

### BFS / DFS
- **BFS (Breadth-First Search)**:
    - Uses a **Queue**.
    - Finds the **shortest path** in unweighted graphs.
    - $O(V + E)$ complexity.
- **DFS (Depth-First Search)**:
    - Uses a **Stack** or **Recursion**.
    - Better for pathfinding, topological sorts, or traversing the entire graph.
    - $O(V + E)$ complexity.

### Sorting
- **Algorithms**:
    - **Merge Sort / Quick Sort / Heap Sort**: $O(n \log n)$ average.
    - **Quick Sort**: $O(n^2)$ worst-case (rare if pivot is good).
    - **Counting Sort / Radix Sort**: $O(n + k)$, linear time if range is small.
- **Stable vs Unstable**: Stable sorts preserve relative order of equal elements.

### Binary Search
- **Condition**: Elements must be **sorted**.
- **Complexity**: $O(\log n)$.
- **Tip**: Use `low + (high - low) / 2` to avoid integer overflow.

### Recursion
- **Base Case**: Must have a terminal condition to prevent stack overflow.
- **Stack Space**: Each recursive call consumes space on the call stack.
- **Tail Recursion**: If the recursive call is the last action, some compilers can optimize it.

### Memory Layout & Cache Effects
- **Stack**: Fast, automatic management (fixed size). Local variables.
- **Heap**: Manual management (`new`/`delete`). Dynamic size, slower allocation.
- **Cache Locality**:
    - **Spatial Locality**: Accessing memory near recently accessed memory (e.g., iterating a vector).
    - **Temporal Locality**: Accessing same memory recently (e.g., using a variable in a loop).
    - **Cache Lines**: Data is loaded in chunks (64 bytes). Jumping pointers (like in `std::list`) kills cache performance.

### Error Handling
- **Exceptions**: `try`, `throw`, `catch`. Good for non-local errors.
- **Return Codes**: Standard in C (e.g., return `-1` on error). More predictable performance.
- **RAII**: Resource Acquisition Is Initialization. Use smart pointers to handle cleanup automatically during stack unwinding.
