---
tags:
  - techops
  - linux
  - dnf
---
what's `YUM`? 
- Yellowdog Updater, Modified

what's Yellowdog then??? 
- a distribution of Linux engineered to run on the PPC architecture

#### why DNF?
DNF offers faster performance, lower memory use, and better dependency resolution using the `libsolv` library

```
sudo dnf history list

dnf history undo <id>
dnf history redo <id>
```
- DNF is package manager, used to install RPM packages
- DNF itself is distributed as a RPM package on RPM-based distros

#techops #linux #dnf 