### **STL Headers & Declarations**

| Data Structure / Concept | C++ STL Header | Standard Declaration |
| --- | --- | --- |
| **Array** | `<vector>` | `vector<int> v;` |
| **String** | `<string>` | `string s;` |
| **Hash Table** | `<unordered_map>` | `unordered_map<int, int> m;` |
| **Stack** | `<stack>` | `stack<int> st;` |
| **Queue** | `<queue>` | `queue<int> q;` |
| **Min-Heap** | `<queue>` | `priority_queue<int, vector<int>, greater<int>> pq;` |
| **Sorting/Searching** | `<algorithm>` | `sort(v.begin(), v.end());` |

---

### **🔴 High Priority**

#### **1. Array (`std::vector`)**

Vectors are dynamic arrays. **Always pass them by reference (`&`)** in recursive or helper functions to avoid `O(N)` copy overhead.

```cpp
vector<int> nums = {1, 2, 3};
vector<int> arr(10, 0); // Size 10, initialized to 0

nums.push_back(4);    // O(1) amortized
nums.pop_back();      // O(1)
nums.size();          // Number of elements (returns size_t)
nums.empty();         // true if empty
nums.front();         // First element
nums.back();          // Last element

// Useful snippets
*max_element(v.begin(), v.end());                 // Get max value
int idx = max_element(v.begin(), v.end()) - v.begin(); // Get max index
v.assign(n, value);                               // Fill vector with n values
iota(v.begin(), v.end(), 0);                      // Fill with 0, 1, 2... (#include <numeric>)
```

#### **2. String (`std::string`)**

```cpp
string s = "hello";
s.length();           // Or s.size()
s.push_back('!');     // Append character O(1)
s.pop_back();         // Remove last character O(1)
s.substr(1, 3);       // (start_index, length) -> "ell"
s.find("ll");         // Returns starting index or string::npos

// Conversions & Character methods
to_string(123);       // int to string
stoi("123");          // string to int (stoll for long long)
isdigit('9'); isalpha('a'); isalnum('1'); tolower('A'); toupper('a');
```

#### **3. Sorting and Searching (`<algorithm>`)**

```cpp
// Sorting
sort(nums.begin(), nums.end());                   // Ascending, O(N log N)
sort(nums.begin(), nums.end(), greater<int>());   // Descending

// Custom Comparator (Lambda function)
sort(nums.begin(), nums.end(), [](int a, int b) {
    return a > b; 
});

// Searching (Array MUST be sorted)
binary_search(nums.begin(), nums.end(), target);  // Returns bool
auto it1 = lower_bound(nums.begin(), nums.end(), target); // First element >= target
auto it2 = upper_bound(nums.begin(), nums.end(), target); // First element > target

// Permutations
next_permutation(v.begin(), v.end());             // Generates next lexicographic permutation
```

#### **4. Matrix (2D `std::vector`)**

```cpp
int rows = 5, cols = 5;
vector<vector<int>> matrix(rows, vector<int>(cols, 0)); // 5x5 of 0s

// Get dimensions
int m = matrix.size();
int n = matrix[0].size();
```

#### **5. Tree (`struct TreeNode`)**

Standard LeetCode definition.

```cpp
struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};
```

#### **6. Graph**

Commonly represented as an Adjacency List.

```cpp
vector<vector<int>> adj(numNodes);
adj[u].push_back(v); // Directed
adj[v].push_back(u); // Undirected

// Visited tracking
vector<bool> visited(numNodes, false);
```

---

### **🟡 Mid Priority**

#### **7. Hash Table (`std::unordered_map` / `std::unordered_set`)**

Use `unordered_map` for `O(1)` average. Use `map` (Red-Black Tree, `O(log N)`) if keys must be sorted.

```cpp
unordered_map<string, int> mp;
mp["apple"] = 5;

// Existence check
if (mp.find("apple") != mp.end()) { /* exists */ }
if (mp.count("apple")) { /* exists */ }

// Frequency Map Pattern
for (char c : s) mp[c]++;

// Iterating
for (auto& [key, value] : mp) { /* process */ }
```

#### **8. Linked List (`struct ListNode`)**

```cpp
struct ListNode {
    int val;
    ListNode *next;
    ListNode(int x) : val(x), next(nullptr) {}
};

// Pro-tip: Use a dummy head to simplify edge cases
ListNode dummy(0);
dummy.next = head;
```

#### **9. Queue & Stack (`<queue>`, `<stack>`)**

In C++, `pop()` returns `void`. Peek the value first.

```cpp
queue<int> q;
q.push(1);            // Enqueue
int first = q.front(); // Peek front
q.pop();              // Dequeue

stack<int> st;
st.push(1);           // Push
int topVal = st.top(); // Peek top
st.pop();             // Pop top
```

#### **10. Heap / Priority Queue (`<queue>`)**

```cpp
// Max-Heap (Default)
priority_queue<int> maxPQ; 

// Min-Heap
priority_queue<int, vector<int>, greater<int>> minPQ;

// Custom Comparator (e.g., for ListNode*)
auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> pq(cmp);

minPQ.push(5);
minPQ.top();          // Peek top element O(1)
minPQ.pop();          // Remove top element O(log N)
```

#### **11. Trie (Prefix Tree)**

```cpp
struct TrieNode {
    TrieNode* children[26] = {nullptr};
    bool isWord = false;
};
```

#### **12. Interval**

Typically `vector<vector<int>>`.

```cpp
sort(intervals.begin(), intervals.end()); // Sorts by start times

// Merge logic
if (curr[0] <= prev[1]) {
    prev[1] = max(prev[1], curr[1]);
}
```

---

### **🟢 Low Priority (Quick Tricks)**

*   **Recursion:** Pass heavy structures (vectors, maps) by reference.
*   **Dynamic Programming:** `vector<int> memo(n + 1, -1);` or `vector<vector<int>> dp(m, vector<int>(n, 0));`
*   **Bit Manipulation:**
    *   Count set bits: `__builtin_popcount(n)`
    *   Clear lowest set bit: `n & (n - 1)`
*   **Math:**
    *   `std::max({1, 2, 3})`, `std::min({a, b, c})` (initializer list)
    *   `accumulate(v.begin(), v.end(), 0)` (sum of elements, `<numeric>`)
    *   `std::gcd(a, b)` (greatest common divisor, `<numeric>`)
*   **Geometry:** Store coordinates as `pair<int, int>`.
