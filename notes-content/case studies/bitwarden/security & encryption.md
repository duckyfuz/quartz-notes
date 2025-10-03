1. master password → stretched master key
	- client side takes master password + salt (email) -> **PBKDF2‑SHA256** with 600,000 iterations -> **256-bit Master Key**
	- expanded via **HKDF** into a **512-bit Stretched Master Key**
2. generating & protecting the symmetric vault key
	- client generates **512-bit random symmetric key + 128-bit IV** using a Cryptographically Secure Pseudorandom Number Generator (CSPRING)
	- symmetric key is encrypted with **AES‑256‑CBC**, using the **Stretched Master Key** and the IV → yielding the **Protected Symmetric Key**
		- protected symmetric key is sent to and stored on the server
3. encryption & integrity
	- the **Protected Symmetric Key** actually contains:
		- a **256-bit encryption key** (to decrypt vault entries)
		- a **256-bit MAC key** (to verify integrity)
	- each vault item is encrypted with the encryption key (AES‑256), and accompanied by a MAC generated using the MAC key
		- on retrieval, the client verifies each item’s integrity before decryption .
4. authentication hash
	- for login, the client creates a **Master Password Hash**: it hashes the Stretched Master Key with the master password as salt using PBKDF-SHA256
	- this hash is sent to the server, where it's salted again and PBKDF2‑SHA256 hashed with ~600k iterations before comparison with the stored value
5. vault decryption & zero-knowledge model
	- upon successful authentication, the server returns (1) encrypted (protected) symmetric key, and (2) encrypted vault blob data
	- the client has to (1) decrypt the Protected Symmetric Key (with Stretched Master Key), (2) derive encryption & MAC keys, then (3) verify and decrypt the vault data **locally**
> [!tip] iterative upgrade & key rotation
> - increase PBKDF2 iterations or switch to **Argon2id** from client settings
>> [!info] when adjusting KDF (key derivation function) settings, the client re-encrypts the Symmetric Key with the **new stretched master key** and updates the authentication hash
>> - vault data itself doesn’t need to be re-encrypted

![[Pasted image 20250619141557.png]]