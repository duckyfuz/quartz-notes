---
tags:
  - languages
  - golang
---
ref: [a tour of go](https://go.dev/tour/list)
### defer statement
```go
func CopyFile(dstName, srcName string) (written int64, err error) {
    src, err := os.Open(srcName)
    if err != nil {
        return
    }
    defer src.Close()

    dst, err := os.Create(dstName)
    if err != nil {
        return
    }
    defer dst.Close()

    return io.Copy(dst, src)
}

```

1. a deferred function’s arguments are evaluated when the defer statement is evaluated
2. deferred function calls are executed in LIFO order after the surrounding function returns
3. deferred functions may read and assign to the returning function’s named return values
### no pointer arithmetic!
### dereferencing structs
```go
type Vertex struct {
	X int
	Y int
}

func main() {
	v := Vertex{1, 2}
	p := &v
	p.X = 1e9 // look at this line!
	fmt.Println(v)
}
```
- in c++, we would need to use something like `(*p).X` - not the case in go!
### slices are like references to arrays
- a slice does not store any data, it just describes a section of an underlying array
- changing the elements of a slice modifies the corresponding elements of its underlying array
### slice literals
```go
a := [3]bool{true, true, false} // type: [3]bool (array)
s := []bool{true, true, false} // type: []bool (slice)
```
- note that slices have *length* (no of elements) and *capacity* (no of elements in the underlying array)
- `s = s[2:]` LOSES information - we cannot access the first 2 values unless we have the original array - ie. *capacity* decreases (along with length)
- the zero value of a slide, `var s []int`, is `nil`
### creating dynamically-sized arrays (via slices)
```go
a := make([]int, 5) // len(a)=5
b := make([]int, 0, 5) // len(b)=0, cap(b)=5

s = append(s, 1) // appending to a slice
s = append(s, 2, 3, 4) // appending multiple values at once

for i, v := range s { // range form of slices (works with maps too)
	fmt.Printf("2**%d = %d\n", i, v)
}
```
- note that if the backing array of `s` is too small to fit all the given values a bigger array will be allocated - the returned slice will point to the newly allocated array
### creating maps
```go
type Vertex struct {
	Lat, Long float64
}

var m map[string]Vertex
m = make(map[string]Vertex)
m["Bell Labs"] = Vertex{
	40.68433, -74.39967,
}

// map literal
var m = map[string]Vertex{
	"Bell Labs": Vertex{
		40.68433, -74.39967,
	},
	"Google":    {37.42202, -122.08408}, // if the top-level type is just a type name, you can omit it from the elements of the literal
}
v1 = Vertex{1, 2} // struct literal for comparison
```

```go
m[key] = elem
elem = m[key]
elem = m[key]
elem, ok := m[key] // ok is true if key is in m
```
### function closures
```go
func adder() func(int) int {
	sum := 0
	return func(x int) int {
		sum += x
		return sum
	}
}

func main() {
	pos, neg := adder(), adder()
	for i := 0; i < 10; i++ {
		fmt.Println(
			pos(i),
			neg(-2*i),
		)
	}
}
```
- the `adder` function returns a closure - each closure is bound to its own `sum` variable
### methods (function with receiver arg)
```go
type Vertex struct {
	X, Y float64
}

func (v *Vertex) Scale(f float64) {
	// value receiver -> (v Vertex)
	// pointer receiver -> (v *Vertex)
	v.X = v.X * f
	v.Y = v.Y * f
}

v.Scale(10) // interpreted as (&v).Scale(10), which is also valid
```
- using a pointer receiver allows us to modify the value the receiver points to
	- and avoids calling the value on each method call
- in general, all methods on a given type should have either value or pointer receivers
### type assertions
```go
var i interface{} = "hello"
s := i.(string)
s, ok := i.(string)
f, ok := i.(float64)
f = i.(float64) // panic

switch v := i.(type) {
case int:
	fmt.Printf()
...
```

#languages #golang 