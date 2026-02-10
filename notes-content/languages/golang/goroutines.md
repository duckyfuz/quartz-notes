---
tags:
  - languages
  - golang
  - concurrency
---
goroutines: `go f(x, y, z)`

### channels
```go
func sum(s []int, c chan int) {
	sum := 0
	for _, v := range s {
		sum += v
	}
	c <- sum // send sum to c
}

func main() {
	s := []int{7, 2, 8, -9, 4, 0}

	c := make(chan int) // need to create the channel before using
	go sum(s[:len(s)/2], c)
	go sum(s[len(s)/2:], c)
	x, y := <-c, <-c // receive from c

	fmt.Println(x, y, x+y)
}
```

### buffered channels
```go
ch := make(chan int, 2)
```
- blocks the goroutine when the buffered channel is full
### range and close
- only the sender should close the channel via `close(ch)`, never the receiver
	- the receiver can test via `v, ok := <-ch`
	- `for i := range c` will receive values from the channel until it is closed
	- sending on a closed channel will cause panic
>[!tip] there is usually no need to close a channel
>- only necessary when the receiver must be told that there is no more values coming
### select statement
```go
  func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		default:
			return // runs when no other case is ready
		}
	}
}
  ```
  - this allows a goroutine to wait on multiple communication operations - it will choose one at random if multiple are ready
### sync.mutex
```go
type SafeCounter struct {
	mu sync.Mutex
	v  map[string]int
}

func (c *SafeCounter) Value(key string) int {
	c.mu.Lock()
	defer c.mu.Unlock() // note the use of defer here
	return c.v[key]
}
```

#languages #golang #concurrency 