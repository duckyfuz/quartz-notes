---
tags:
  - linux
  - techops
---
#### RAID 0 (striping)
- data is split into blocks and written across multiple discs simultaneously
- high read/write speeds, but no fault tolerance

#### RAID 1 (mirroring)
- data is duplicated across 2 separate drives
- high data redundancy, but decrease in usage capacity

#### RAID 5 (striping with distributed parity)
- data is striped across disks, with parity information (error detection/correction data) distributed across all drives
- improved performance and data redundancy with a reasonable loss of usable storage space
	- significant performance penalty on writes and may lose data if more than one drive fails

#### RAID 6 (striping with double distributed parity)
- RAID 5 with an additional parity block, allowing for the loss of two drives without data loss
- higher fault tolerance, but requires more drives, offers even less usable capacity than RAID 5, and has a larger write performance penalty

#### RAID 10 (RAID 1 + 0)
- combination of RAID 1 mirroring and RAID 0 striping
	- data is first mirrored and then striped across those mirrored sets
- excellent performance and good fault tolerance
	- requires minimum of four drives and loses 50% of the total disk space

#linux #techops