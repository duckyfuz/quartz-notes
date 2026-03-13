---
tags:
  - security
  - auth
---
CORS: cross origin resource sharing
CSRF: cross-site request forgery

- CSRF is an attack vector that tricks a user into executing actions on a web application in which they are authenticated, without their knowledge or consent

> [!warning] note that while the client is unable to view the resource when CORS is enabled, the request might still be carried out by the browser

- to prevent CSRF attacks, a simple way is to use nonces (as CSRF tokens)
	- a nonce is a random or unique value that is generated for each request - it can only be used once

#security #auth