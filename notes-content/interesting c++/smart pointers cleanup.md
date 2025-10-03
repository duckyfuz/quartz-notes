- happens through the destructor mechanism and the [[RAII (Resource Acquisition Is Initialization) principle]]

- smart pointers are stack-allocated objects, not heap objects
	- in C++, all stack objects have their destructor called automatically when they go out of scope
##### exception safe
- C++ performs stack unwinding when an exception is thown (anywhere)
	- automatically calls destructors for all stack objects that were successfully constructed
##### unique_ptr vs shared_ptr
- unique_ptr - destructor immediately calls destructor of managed object
- shared_ptr - decrements a reference counter, deletes if the counter reaches 0