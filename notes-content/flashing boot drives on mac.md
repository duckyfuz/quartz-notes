```
hdiutil convert proxmox-ve_*.iso -format UDRW -o proxmox-ve_9.0-1.dmg
```

```
diskutil list
diskutil unmountDisk /dev/diskX
```

```
sudo dd if=proxmox-ve_*.dmg bs=1M of=/dev/rdiskX
```

> [!tip] _rdiskX_, instead of _diskX_, in the last command is intended
> it will increase the write speed - on macOS, `rdisk` refers to the **raw device** while `disk` refers to the **block device**
> - **`rdisk` (raw disk)**: Faster, unbuffered I/O directly to the device
> - **`disk` (block device)**: Buffered I/O with caching
> 
> `rdisk` is significantly faster for large file operations like disk imaging as it provides direct access - bypasses system caches and buffers
