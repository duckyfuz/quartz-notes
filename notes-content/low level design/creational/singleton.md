- restricts the instantiation of a class to one single instance

##### however...
- violates the *single responsibility principle*
	- single responsibility principle - a class should have only one responsibility
	- here, the class (1) manages its own instance, and (2) performs some business logic
- difficulties with unit testing as most test frameworks rely on inheritance when producing mock objects

```
class SingletonMeta(type):
    """
    The Singleton class can be implemented in different ways in Python. Some
    possible methods include: base class, decorator, metaclass. We will use the
    metaclass because it is best suited for this purpose.
    """

    _instances = {}

    def __call__(cls, *args, **kwargs):
        """
        Possible changes to the value of the `__init__` argument do not affect
        the returned instance.
        """
        if cls not in cls._instances:
            instance = super().__call__(*args, **kwargs)
            cls._instances[cls] = instance
        return cls._instances[cls]

class Singleton(metaclass=SingletonMeta):
    def some_business_logic(self):
		pass

if __name__ == "__main__":
    s1 = Singleton()
    s2 = Singleton()

    assert id(s1) == id(s2)
	print("singleton test passed")
```

> [!warning] multi-threaded environment?
> - add a lock to `SingletonMeta`
> 	- eg. `_lock: Lock = Lock()` and `with cls._lock:`

