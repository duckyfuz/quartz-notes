- i delete stuff when they are committed to memory :)

### General & Misc
- `std::max({1, 2, 3})`, `std::min({a, b, c})` - takes initializer list.
- `accumulate(v.begin(), v.end(), 0)` - sum of elements (in `<numeric>`).
- `__builtin_popcount(n)` - count set bits (number of 1s).

### Strings & Numbers
- `s.substr(start, len)` - extract substring. $O(len)$.
- `to_string(123)` - int to string.
- `stoi("123")`, `stoll("...")` - string to int/long long.
- `s.back()`, `s.pop_back()`, `s.push_back('c')` - treat string like a vector/stack.
- `isdigit(c)`, `isalpha(c)`, `isalnum(c)`, `tolower(c)`, `toupper(c)`.

### Vectors & STL Algorithms
- `*max_element(v.begin(), v.end())` - get max value (dereference iterator).
	- `int idx = max_element(v.begin(), v.end()) - v.begin();` - get max index.
- `reverse(v.begin(), v.end())` - reverse in place.
- `v.assign(n, value)` - fill vector with $n$ values.
- `iota(v.begin(), v.end(), 0)` - fill with $0, 1, 2, \dots$ (in `<numeric>`).
- **Complexity**: $O(1)$ random access, $O(1)$ amortized append.

### Hash Tables (`unordered_map`, `unordered_set`)
- **Complexity**: $O(1)$ average for search/insert/delete. $O(n)$ worst-case (rare collisions).
- **`map` vs `unordered_map`**:
    - `map`: Red-Black Tree (balanced BST), $O(\log n)$, keys are sorted.
    - `unordered_map`: Hash table, $O(1)$ average, keys are unsorted.
- `m.count(key)` - returns 1 if key exists, 0 otherwise.
- **Frequency Map Pattern**:
  ```cpp
  unordered_map<char, int> freq;
  for (char c : s) freq[c]++;
  ```

### Binary Trees
- **Structure**: Nodes with `left` and `right` pointers.
- **Complexities**: Search/Insert in BST is $O(h)$, where $h$ is height ($h = \log n$ balanced, $h = n$ skewed).
- **Traversal**:
    - **Pre-order**: Root, Left, Right
    - **In-order**: Left, Root, Right (Gives sorted order for BST)
    - **Post-order**: Left, Right, Root
- **Pointer Tip**: Always check `if (!root)` to handle base cases.

### Heaps (`priority_queue`)
- **Complexity**: $O(\log n)$ for push/pop, $O(1)$ for top.
- **Building a Heap**: $O(n)$ if using constructor with vector, $O(n \log n)$ if pushing one by one.
- **Min-heap**: `priority_queue<int, vector<int>, greater<int>> pq;`
- **Custom Comparator (e.g., for `ListNode*`)**:
  ```cpp
  auto cmp = [](ListNode* a, ListNode* b) { 
      return a->val > b->val; // min-heap
  };
  priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);
  ```
- **Custom Comparator (e.g., pair)**:
  ```cpp
  auto cmp = [](pair<int, int> a, pair<int, int> b) {
      return a.second > b.second; // min-heap by second element
  };
  priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(cmp)> pq(cmp);
  ```

### Binary Search
- `binary_search(v.begin(), v.end(), target)` - returns T/F.
- `lower_bound(v.begin(), v.end(), target)` - first element **≥** target.
	- `int idx = lower_bound(...) - v.begin();`
- `upper_bound(v.begin(), v.end(), target)` - first element **>** target.

### Sorting & Permutations
- `sort(v.begin(), v.end(), greater<int>())` - descending order.
- `sort(v.begin(), v.end(), [](int a, int b) { return a < b; })` - custom lambda.
- `next_permutation(v.begin(), v.end())` - generates next lexicographic permutation, returns T/F.
