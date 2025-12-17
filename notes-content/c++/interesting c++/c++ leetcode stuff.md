- i delete stuff when they are committed to memory :)
##### Misc.
- `std::max()` can take in a list - eg. `max({1,2,3})`
##### Vectors
- `max_element(v.begin(), v.end())` - rmb to deference w. (`*it`)
	- note that we can get the index with `it - v.begin()`
##### Strings
- `std::string sub1 = original_string.substr(7, 3);`
	- extract a substring from index 7 with len of 3
##### Binary Search
- `binary_search(v.begin(), v.end(), target)` returns T/F
- `lower_bound(v.begin(), v.end(), target)` - returns iterator to first element ≥ target
	- ie. `it - v.begin()` is the first "spot" for target
- `upper_bound(v.begin(), v.end(), target)` - returns iterator to first element > target
##### Sorting & Permutations
- `sort(v.begin(), v.end(), greater<int>())` - sorts in descending order
	- `sort(v.begin(), v.end(), [](int a, int b){return a < b})`
- `next_permutation(v.begin(), v.end())` - generates next lexicographic permutation, returns T/F
##### Priority Queue / Heap
- `priority_queue<int, vector<int>, greater<int>> pq` - min heap
	- `pq.top()`, `pq.push()`, `pq.pop()` - access top, insert, remove
- with custom comparator:
```
auto cmp = [](pair<int, int> a, pair<int, int> b) {
    return a.second > b.second;  // min heap by second element
};
priority_queue<pair<int, int>, vector<pair<int, int>>, decltype(cmp)> pq(cmp);
```
