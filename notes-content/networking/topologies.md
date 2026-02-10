---
tags:
---
### star / hub and spoke
- used in most large and small networks - all devices are connected to a central device
- eg. switched ethernet networks (the switch is in the middle)
### mesh
- multiple links to the same place - can be fully connected / partially connected
- allows for redundancy & fault tolerance
- usually used in wide area-networks (WANs)
### hybrid
- hub and spoke + mesh
### spine and leaf
- 3 tier network - each spine switch connects to each leaf switch
	- leaf switches do not connect to each other (same for spine switches)
![[Screenshot 2026-01-21 at 17.51.59.png]]
- some datacenters use top-of-rack switching, where each "leaf" is on top of a physical network rack
### point to point
- one-to-one connection
- eg. connections between buildings, older WAN links