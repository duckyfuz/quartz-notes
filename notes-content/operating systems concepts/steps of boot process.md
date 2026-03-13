---
tags:
  - os
---
### 1. power supply initialization
- power supply unit (PSU) sends electricity to the essential components
### 2. BIOS / UEFI startup & POST (power on self test)
- POST checks whether critical hardware components such as RAM, CPU are functioning correctly
	- if an error is detected, the system displays an error message / a series of beeps (POST beep codes)
- BIOS / UEFI configures connected devices
### 3. loading the bootloader
- BIOS / UEFI looks for a bootable device based on the configured boot order
	- BIOS -> Master Boot Record (MBR)
	- UEFI -> GUID Partition Table (GPT) to locate the EFI System Partition (ESP)
	- the boot sector contains a small program named the bootloader
- bootloader loads the actual OS kernel into memory
### 4. kernel & init process
- OS kernel is loaded into RAM - manages CPU, mem, hardware devices
	- initializes system drivers, prepare user space etc
	- final step is to start the init process
		- init determines the initial run level of the system
### 5. starting system services and daemons
- networking services, printing services, graphical display manager (X-server / Wayland)
- 

#os