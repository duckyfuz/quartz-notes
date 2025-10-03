**Background**
- typical generators allow pausing execution to produces a value, but do not allow for values or exceptions to be passed in when execution resumes
	- do not allow for execution to be paused within the try portion of `try/finally` blocks 
		- which makes it difficult for an aborted coroutine to clean up after itself
- if we can pass values or exceptions into a generator at the point where it was suspended, a co-routine scheduler or _trampoline function_ would be able to let coroutines call each other w/o blocking
	- `data = (yield nonblocking_read(my_socket, nbytes))` will pause execution until `nonblocking_read()` coroutine produces a value
- consumer decorator that makes a generator function automatically advance to its first yield point when initially called: (send() cannot be meaningfully called on a just-started generator)
```
def consumer(func):
	def wrapper(*args,**kw):
		gen = func(*args, **kw)
		gen.next()
		return gen
	wrapper.__name__ = func.__name__
	wrapper.__dict__ = func.__dict__
	wrapper.__doc__  = func.__doc__
	return wrapper
```
- just add `@consumer` at the top of the generator function!
- example of a _trampoline function_:
```
class Trampoline:
	"""Manage communications between coroutines"""

	running = False

	def __init__(self):
		self.queue = collections.deque()

	def add(self, coroutine):
		"""Request that a coroutine be executed"""
		self.schedule(coroutine)

	def run(self):
		result = None
		self.running = True
		try:
			while self.running and self.queue:
			   func = self.queue.popleft()
			   result = func()
			return result
		finally:
			self.running = False

	def stop(self):
		self.running = False

	def schedule(self, coroutine, stack=(), val=None, *exc):
		def resume():
			value = val
			try:
				if exc:
					value = coroutine.throw(value,*exc)
				else:
					value = coroutine.send(value)
			except:
				if stack:
					# send the error back to the "caller"
					self.schedule(
						stack[0], stack[1], *sys.exc_info()
					)
				else:
					# Nothing left in this pseudothread to
					# handle it, let it propagate to the
					# run loop
					raise

			if isinstance(value, types.GeneratorType):
				# Yielded to a specific coroutine, push the
				# current one on the stack, and call the new
				# one with no args
				self.schedule(value, (coroutine,stack))

			elif stack:
				# Yielded a result, pop the stack and send the
				# value to the caller
				self.schedule(stack[0], stack[1], value)

			# else: this pseudothread has ended

		self.queue.append(resume)
```