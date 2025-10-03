thought: if a client needs the master key to decrypt the encrypted blobs, how does logging in with another device work?

1. the initiating client POSTs a request to an Authentication Request table in the BE db
	- includes the email address, a unique auth-request public key, and an access code
> [!help] auth-request public and private keys are uniquely generated for each passwordless login request and only exist for as long as the request does
> requests expire and are purged from db every 15 minutes if they aren't approved or denied
2. registered devices are provided the request
	- meaning mobile or desktop apps that are logged in and have a device-specific GUID stored in the Bitwarden database
3. when the request is approved, the approving client encrypts the account's master key and master password hash using the auth-request public key enclosed in the request
4. the approving client then PUTs the encrypted master key and encrypted master password hash to the Authentication Request record and marks the request fulfilled
5. the initiating client GETs the encrypted master key and encrypted master password hash
	- locally decrypts the master key and master password hash using the auth-request private key
	- uses the access code and fulfilled authentication request to authenticate the user with the Bitwarden Identity service
>[!info] the client does **not** receive the master password - it only receives the stretched master key and the hashed master password (view [[security & encryption]])
> - the stretched master key is all that's needed to decrypt the protected symmetric key, which is used to decrypt the vault
> - the hashed password is needed to authenticate with Bitwarden's Identity server

