virtual filesystems are made up of inodes, data blocks, and superblocks

![[inodes.webp]]

- the superblock is essentially file system metadata and defines the file system type, size, status, and information about other metadata structures
	- very critical to the file system and therefore is stored in multiple redundant copies for each file system
	- if the superblock is corrupted, we can use [[what the fsck|fsck]] to select an alternate, backup copy of the superblock and attempt to recover the file system
- **direct blocks** point to the start of the file, allowing quick access to small files
- **single indirect blocks** point to an indirect block that contains pointers to more data blocks
- **dentry** (directory entry) relates inode numbers to file names
	- dentries also play a role in directory caching, reducing the need to repeatedly read directory data from disk
	- and in file system traversal as it maintains a relationship between directories and their files

#### what do inodes store?
- files size, file types, timestamps
- **permissions**
- **owner and group**

#### soft & hard links
**soft link**: a soft link is a special type of file that points to a target file or directory's path
- if the target file is moved, renamed, or deleted, the soft link breaks and becomes a dangling link, pointing to a non-existent location
- can span across different filesystems since it merely holds the path to the target file
**hard link**: a hard link is an additional directory entry for a file that points to the same inode
- because it refers directly to the inode, the hard link remains valid even if the original file is moved or renamed
	- ie. additional dentry for the same inode
- must reside on the same filesystem as the original file because it points to the inode directly
	- cannot normally link to directories due to the potential for creating circular references, which could corrupt the filesystem


#### file allocation methods
1. contiguous allocation
2. linked allocation
3. indexed allocation
	- inodes employs a combination of aspects from both linked and indexed allocation methods
	- allowing for the fast and direct access benefits of indexed allocation and the extendability of linked allocation through indirect blocks (and multilevel indexes)