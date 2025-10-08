pipe: `|`
redirection: `<` or `>`

that's all.


a new process starts up with three standard file descriptors (or streams, or whatever they may be called in different languages)
- stdin, stdout, stderr

output redirection: `some_prog > out.txt`
- shell connects the program's stdout to the specified file, so when the program writes to stdout, it goes into that file
- but errors still go to the terminal!
	- to redirect stderr, use `2> err_out.txt`
	- to combine both into the same file, use `&> combined.txt`
> [!tip] to append to an existing file instead of overwriting, we can use `>>`

input redirection: `some_prog < in.txt`
- shell connects the program's stdin to the specified file
	- when the program reads input from stdin, it will come from the file
> [!warning] nothing the user types on the keyboard is seen by the program

running programs in pipelines: `cat log.txt | grep "ERROR"`
- shell creates a pipe, connects the stdout of the first process to the write side of the pipe, and connects the stdin of the second process to the read side of the pipe