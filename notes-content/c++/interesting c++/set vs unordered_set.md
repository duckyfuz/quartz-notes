- a little birdie once told me that `set.begin()` gives me the min element
	- how's that possible if retrieval from a set is `O(1)` <- my misconception
	- that's because retrieval is actually `O(log(n))` (in C++)

- `std::set` in c++ is implemented with a binary search tree (usually red-black)
- `std::unordered_set` in C++ is implemented with a hash map

- then what about unordered_map and map?
- similarly, `std::map` uses a BST (red-black), 
- while `std::unordered_map` uses a hash map (bucket chaining)
	- time complexities of operations are as expected

no free lunch!!!

>[!tip] but in reality?
>`std::map` can be (and is often) faster than `std::unordered_map`
>- with `std::map`, you're comparing keys, which means you only need to compare enough of the beginning of a key to distinguish between the right and left sub-branches
>	- while with `std::unordered_map`, you need to hash the entire key
> > [!warning] but is that really true?
>> only for collections of random strings - if the strings have considerable amounts of prefix-overlap, the rule breaks down
>- resizing hash tables are also pretty slow
>- furthermore, how good is the C++ hash function?

