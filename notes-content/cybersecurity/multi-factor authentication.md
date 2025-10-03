good reference: https://cheatsheetseries.owasp.org/cheatsheets/Multifactor_Authentication_Cheat_Sheet.html
- combines factors from 3 categories: (1) knowledge, (2) possession, and (3) inherence
	- inherence: something you are - eg. fingerprint, voiceprint

##### types of OTP
- time-based OTP (TOTP): both the server and the user's device share a secret key
	- independently calculate the OTP using the current time and the secret key
- HMAC-based OTP (HOTP): uses a counter instead of time
	- increases the counter each time an OTP is generated
	- OTP is generated using a hash-based message authentication code (HMAC), the secret key, and the counter value
- what about SMS? can be intercepted

##### how FIDO2/WebAuthn works
- registration
	- website generates a challenge and sends it to the user's browser
	- browser forwards the challenge to the security key via CTAP
	- security key creates a new cryptographic key pair (private and public key)
	- private key remains securely stored on the key, and the public key is sent back
	- website stores the public key associated with the user's account
- authentication
	- website generates a new challenge and sends it to the user's browser
	- browser forwards the challenge to the security key via CTAP
	- security key uses its private key to sign the challenge
	- signed response is sent back to the website
	- website verifies the signature using the stored public key