---
tags:
  - self-hosting
  - file-sharing
  - syncthing
---
### installation
#### macOS
```bash 
brew install syncthing
sudo brew services start syncthing
```
#### ubuntu
```bash
sudo apt install syncthing
sudo apt install jq # for convenience
```

add the [service file](https://github.com/syncthing/syncthing/tree/main/etc/linux-systemd/user) into the load path of the user (eg. `~/.config/systemd/user/`)

```bash
systemctl --user enable syncthing.service
systemctl --user start syncthing.service
```

>[!note] how can we get automatic startup at boot instead of at login?
>- we need to enable `systemd` lingering (also used here: [[podman]])
>```bash
>sudo loginctl enable-linger <username>
systemctl --user enable syncthing.service
>```
####  iOS / iPadOS (third-party)
install [Synctrain](https://testflight.apple.com/join/2f54I4CM) via [TestFlight](https://apps.apple.com/us/app/testflight/id899247664)
### configuration
1. install and start syncthing
2. get device IDs
```bash
# on device A
DEVICE_A_ID=$(syncthing cli show system | jq -r .myID)
echo "Device A ID: $DEVICE_A_ID"

# on device B
DEVICE_B_ID=$(syncthing cli show system | jq -r .myID)
echo "Device B ID: $DEVICE_B_ID"
```
3. exchange device IDs
```bash
# on device A
syncthing cli config devices add --device-id $DEVICE_B_ID --name DeviceB

# on device B
syncthing cli config devices add --device-id $DEVICE_A_ID --name DeviceA
```
4. create & share folder
```bash
# ON DEVICE A
# generate folder ID
FOLDER_ID=$(dd if=/dev/urandom bs=32 count=1 2>/dev/null | sha1sum | cut -d' ' -f1)

# create folder
mkdir -p ~/sync_folder

# register folder
syncthing cli config folders add \
  --id $FOLDER_ID \
  --label "My Sync" \
  --path ~/sync_folder

# Share with Device B
syncthing cli config folders $FOLDER_ID devices add \
  --device-id $DEVICE_B_ID
  
# ON DEVICE B
# accept the same folder
syncthing cli config folders add \
  --id $FOLDER_ID \
  --label "My Sync" \
  --path ~/sync_folder

# share back to Device A
syncthing cli config folders $FOLDER_ID devices add \
  --device-id $DEVICE_A_ID
```
5. verify connection
```bash
# check connections
syncthing cli show connections

# check folder status
syncthing cli show folder $FOLDER_ID
```

>[!tips] how is this secure? there are no key exchange, passcodes, etc
>
>syncthing uses **cryptographic identity** instead of passwords:
>
>1. **device id = public key** - your 256-bit device id is actually a sha256 hash of your tls certificate's public key
>2. **tls 1.3 encryption** - all communication uses modern tls with perfect forward secrecy
>3. **certificate pinning** - devices verify each other's cryptographic identity directly (no certificate authorities)
>4. **trust-on-first-use** - like ssh, you verify the device id once, then it's cryptographically pinned
>
>**security properties:**
>- ✅ **no password needed** - identity is the credential
>- ✅ **mitm protection** - cannot spoof device ids
>- ✅ **end-to-end encrypted** - even relay servers can't read your data
>- ✅ **self-signed certificates** - no central authority required
>
>**key insight:** when you exchange device ids, you're actually exchanging **public key fingerprints**. the actual key exchange happens during tls handshake, where devices prove they own the private key matching the public key in their id.

#self-hosting #file-sharing #syncthing 