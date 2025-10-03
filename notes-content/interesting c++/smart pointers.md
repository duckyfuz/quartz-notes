so during my AutoDesk interview they asked what smart pointers were and i was like idk :(

- similar to garbage collection but without the performance overhead!!!
- handles cleanup via [[smart pointers cleanup]]
##### single owner -> unique_ptr
```
// Old way (manual memory management)
LargeObject* pLarge = new LargeObject("MyObject");
// ... use pLarge
delete pLarge; // YOU must remember to do this!

// Smart pointer way
std::unique_ptr<LargeObject> pLarge(new LargeObject("MyObject"));
// ... use pLarge
// NO delete needed - automatic cleanup when pLarge goes out of scope!

// Better (preferred modern style)
std::unique_ptr<LargeObject> pLarge = std::make_unique<LargeObject>("MyObject");

// Or even shorter
auto pLarge = std::make_unique<LargeObject>("MyObject");
```
##### moving unique_ptr ownership
- `std::unique_ptr<Person> p2 = std::move(p1);`

##### multiple owners -> shared_ptr
- `std::shared_ptr<Resource> resource1 = std::make_shared<Resource>(42);`
- `std::shared_ptr<Resource> resource2 = resource1; // Share ownership`
- `resource1.use_count()` to show how many owners
	- object is only destroyed when the last `shared_ptr` goes out of scope