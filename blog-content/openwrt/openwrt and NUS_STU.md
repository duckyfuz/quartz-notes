`opkg install wpa-supplicant`
> [!warning] might need to uninstall `wpad-basic` or something along those lines

`vim /etc/config/wireless`

```/etc/config/wireless
config wifi-iface 'wifinet3'
        option device 'radio0'
        option network 'wwan'
        option mode 'sta'
        option ssid 'NUS_STU'
        option encryption 'wpa2'
        option eap_type 'peap'
        option identity '<E123...>'
        option password '<PASSWORD>'
        option auth 'EAP-MSCHAPV2'
```

`/etc/init.d/network restart`
