---
tags:
  - linux
  - techops
---
fsck (File System ChecK) is essentially a front-end for filesystem specific checkers
- fsck can be used to restore the primary superblock of a filesystem if it becomes corrupted
```bash
sudo umount /dev/sdb1 # unmount the filesystem first
sudo dumpe2fs /dev/sdb1 | grep -i superblock # find the block number of a valid backup superblock
sudo fsck -b 32768 /dev/sdb1 # execute with the selected superblock's block number
```
- fsck also checks for corrupt or out of range inodes
	- and inconsistencies in the file system's block map

> [!tip] there also exists a `git fsck` tool
> `git fsck` performs a "file system check" on the Git object database - its primary purpose is to verify the integrity and connectivity of objects within a Git repository
> - (1) verifies SHA-1 of each object in the DB matches its content, 
> - (2) verifies that all objects are reachable from a designated set of "head" nodes and that the connections between objects are valid, 
> - (3) identifies corruption - any inconsistencies found, and 
> - (4) finds unreachable and dangling objects


#linux #techops