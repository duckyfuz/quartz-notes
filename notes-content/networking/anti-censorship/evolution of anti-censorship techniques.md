1. **VPNs (Virtual Private Networks):**
	- encrypt data between a user’s device and a VPN server
	- mask the user’s IP, making it appear as if traffic originates from the server’s location
	- often use common protocols like OpenVPN, L2TP/IPsec, or IKEv2/IPsec
	**Detection Methods:**
        - **Deep Packet Inspection (DPI):** Censors can use DPI to recognize patterns typical of VPN protocols
        - **Known Server IPs:** Censors may maintain lists of known VPN server IP addresses and block them
        - **Port Blocking:** Most VPNs use specific ports (e.g., OpenVPN on UDP 1194 or TCP 443); blocking these can disrupt VPN services
2. **Shadowsocks:**
	- open-source, lightweight socks5 proxy with encryption
		- appears as normal HTTP traffic
	**Detection Methods:**
        - **Traffic Patterns:** While it mimics HTTPS, its traffic pattern may still differ slightly from genuine HTTPS, making it detectable
        - **Server Fingerprinting:** Similar to VPNs, servers can be identified and blocked if censors know IP addresses running Shadowsocks
        - **Anomalous Traffic Patterns:** Detecting the unique initialization or handshake signals
3. **V2Ray:**
	- modular framework supporting various transport protocols (e.g., WebSocket, HTTP, TCP)
		- capable of dynamically switching protocols to avoid detection
		- supports a wide range of protocols like VMess, VLESS, and Trojan, which are designed to evade detection by mimicking normal HTTPS or other legitimate traffic
    - **Detection Methods:**
        - **Statistical Traffic Analysis:** Can potentially identify protocol switching or unknown traffic types
        - **Known IP/Domain Blacklisting:** As with other systems, reliance on specific servers can lead to blacklisting
4. **Xray:**
	- successor to V2Ray; retains and enhances its functionalities
	- supports additional protocols such as VLESS and Trojan, designed to mimic legitimate HTTPS traffic
	- enhanced obfuscation techniques to further blend with regular traffic
    - **Detection Methods:**
        - **Protocol Fingerprinting:** Censors may develop capabilities to identify protocol-specific traffic fingerprints, despite attempts at mimicry
        - **Behavioral Analysis:** Monitoring anomalies in data flow and session establishment activities

#### General Strategies for Detection:
- **Machine Learning:** Censors may deploy AI models trained on identifying irregular patterns or anomalies typically associated with circumvention tools.
- **Traffic Volume and Flow Analysis:** High volumes of encrypted traffic or unique flow patterns (such as frequent switching between connections) might draw suspicion.
- **Endpoint Profiling:** Locating and monitoring endpoints that frequently connect to a range of foreign IPs could signal the use of VPN or proxy services.
- **Domain and IP Blacklist Expansion:** Continuously updating databases to include new domains and IPs linked with circumvention tools.