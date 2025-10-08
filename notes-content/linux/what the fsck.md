fsck (File System ChecK) is essentially a front-end for filesystem specific checkers
- fsck can be used to restore the primary superblock of a filesystem if it becomes corrupted
```bash
sudo umount /dev/sdb1 # unmount the filesystem first
sudo dumpe2fs /dev/sdb1 | grep -i superblock # find the block number of a valid backup superblock
sudo fsck -b 32768 /dev/sdb1 # execute with the selected superblock's block number
```
- fsck also checks for corrupt or out of range inodes
	- and inconsistencies in the file system's block map