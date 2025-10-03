- ensure that the user on the other end is not a bot
- can be viewed as a bot-mitigation control or part of an access-management policy
	- usually wrapped into WAFs such as CloudFlare, AWS shield
#### active CAPTCHA
- shows a puzzle up front (eg. distorted text (early CAPTCHAs), image labelling (reCAPTCHA v2, hCAPTCHA), logic or drag puzzles, audio variants)
- puzzles are generated from a huge space so bots cannot pre-compute all answers
- mouse / touch movements, dwell time, etc feed a behavioural model
#### invisible / risk-score systems (reCAPTCHA v3, CloudFlare Turnstile)
- collects passive signals on every page load (eg. browser fingerprint, timing patters such as DOM build time, interaction traces such as mouse uptime, scroll momentum)
- passive signals are fed into a ML model and a score is returned
#### cryptographic attestation (Privacy Pass, Apple Private Access Tokens)
- device attests (with Secure Enclave / TPM) that it's genuine hardware
- blind signature protocol keeps identity private while issuing a signed token
	- subsequent sites can accept that token instead of running their own CAPTCHA
#### proof-of-work / proof-of-time (Brave's BAT CAPTCHA, Hashcash)
- forces the client to do a small but non-parallelizable computation (eg. SHA256 with a certain number of leading zeros)
	- a regular browser barely notices, but a botnet will need to burn real CPU / GPU time per request, making mass abuse expensive