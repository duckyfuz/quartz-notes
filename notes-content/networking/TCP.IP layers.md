---
tags:
  - Networking
---
### 5. application layer - application data
encapsulates data from applications, such as HTTP, FTP, SMTP, etc., and passes it to the transport layer
### 4. transport layer - segments
takes application data and breaks it into smaller, more manageable pieces depending on maximum transmission unit (MTU)

ensures reliable data transfer and manages end-to-end communication
- includes source and destination **port numbers**, sequence numbers, and data for error checking
### 3. internet layer (network layer) - packets
if necessary, each segment is broken down again depending on MTU

routes data between devices across networks
- includes source and destination **IP addresses**, header information, and payload data
### 2. network access layer (data link layer) - frames
transfers data between adjacent network nodes
- includes source and destination **MAC addresses**, error detection codes (like CRC), and payload data
### 1. physical layer - bits
transmits raw binary data over physical medium
- solely concerned with the transmission medium and signal type (e.g., electrical signals, light, radio waves)

#Networking 