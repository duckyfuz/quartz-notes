---
tags:
  - Networking
  - TLS
---
### \_-Way Handshake
1. ➡️ ClientHello (send with ACK from TCP): 
	- includes (1) supported TLS version, (2) supported cipher suites, (3) **"client random"**
2. ⬅️ ServerHello + Certificate:
	- includes (1) **server SSL certificate**, (2) chosen cipher suite, (3) **"server random"**
3. ➡️ ClientKeyExchange + ChangeCipherSpec + Finished
	- client verifies the server's SSL certificate with the certificate authority that issued it - the handshake only continues if the client is satisfied
	- includes (1) **"premaster secret"** (encrypted with server's public key from SSL cert)
	- generate session keys
4. ⬅️ ChangeCipherSpec + Finished
	- generate session keys

> [!warning] this method does not allow for perfect forward secrecy (PFS)
> for PFS, we would use ephemeral diffie-hellman (ECDHE) 
> - client and server publicly agree on a common prime modulus (`p`) and a generator (`g`)
> - client and server each create a temporary, secret number - an ephemeral private key (`c` and `s` respectively)
> - client and server shares their public keys (`g^c mod p` and `g^s mod p`)
> - client and server are able to calculate the shared symmetric key
> an attacker would need to find one of the private keys to derive the symmetric key
> - required to solve an equation similar to `5^c mod 23 = 8` (discrete logarithm problem), which is computationally impossible to solve (currently) when the keys are large enough

**TLS false start**
does not modify the TLS handshake protocol, rather it only affects the protocol timing of when the application data can be sent
- intuitively, once the client has sent the `ClientKeyExchange` record, it already knows the encryption key and can begin transmitting application data
- the rest of the handshake is spent confirming that nobody has tampered with the handshake records, and can be done in parallel

**0-RTT resumption**
in a previous successful handshake, the client and server agree on a session resumption mechanism - the server provides a session ticket, which includes information about the keys used during that session and allows the client to initiate a new session later using a pre-shared key derived from the previous session
- when the client wants to establish a new connection, it uses the previously obtained session ticket to start a 0-RTT handshake
	- this involves sending a ClientHello message that contains the session ticket and an EarlyData message, which can include application data such as HTTP requests
- security properties that TLS provides to 0-RTT request are slightly weaker than those it provides to regular requests (attackers can potentially capture and resend the early data)

#Networking #TLS 