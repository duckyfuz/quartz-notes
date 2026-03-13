---
tags:
  - linux
  - techops
---
```
$ touch a
no space left on device

$ df -ah
Filesystem      Size  Used Avail Use% Mounted on
overlay         512M  512M  0M   100% /

$ ls -lah log
-rw-r--r-- 1 user user 400M Jul  8 07:15 log

$ rm log
$ ls -lah log
no file

$ touch a
no space left on device
```

### WHY???
there are 2 possible reasons
1. when you delete a file, you remove its directory entry, but the file itself (its data blocks) stays on disk as long as any process holds an open file descriptor for it
	- can try `lsof | grep "log"` to see if there are processes using the file
2. there is a hard link to the file
	- `ls -i log` -> `find / -inum <inode_number>`
	- we can also use `ls -l` to find the number of hard links to a file (2nd column)

#linux #techops