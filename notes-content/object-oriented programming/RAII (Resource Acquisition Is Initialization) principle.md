- ties resource management to object lifetime
	- ensures that resources are properly acquired when any object is created and automatically released when the object is destroyed
- guarantees that when an object goes out of scope, its destructor will be called immediately and predictably
	- makes resource allocation automatic and deterministic
	- no need for garbage collection
##### fundamental idea
- resources should be acquired in a constructor and released in a destructor
##### use cases
- memory management: smart pointers
- file handling: file stream classes ensure files are properly closed when object goes out of scope
- thread management: automatically join threads when thread guard objects are destroyed
- mutex and lock management: ensure that mutexes are unlocked when the guard goes out of scope
##### benefits
- automatic resource management
- simplified code
- consistency
- encapsulation