what's kanata? kanata is  like karabiner, but available on linux, macOS, and windows (which is why i had no choice but to switch to it)


download kanata [here](https://github.com/jtroo/kanata/releases)


`kanata.service`
```
[Unit]
Description=Kanata keyboard remapper
After=network.target

[Service]
Type=simple
WorkingDirectory=/home/kenf/Developer/kanata
ExecStart=/home/kenf/Developer/kanata/kanata --cfg /home/kenf/Developer/kanata/config.kbd
Restart=no

[Install]
WantedBy=multi-user.target
```

`config.kbd`
```
(defsrc
  caps tab h j k l ret
)

(defalias
  ;; Layer activated by holding caps
  nav-layer (layer-while-held nav)

  ;; In nav layer:
  to-esc esc
  to-left left
  to-down down
  to-up up
  to-right right
  toggle-caps caps
)

;; Base layer: Caps does nothing alone
(deflayer base
  @nav-layer  ;; capsyour own folders
  _           ;; tab
  _ _ _ _     ;; h j k l
  _           ;; ret
)

;; Layer activated when Caps is held
(deflayer nav
  XX          ;; caps (no action)
  @to-esc     ;; tab
  @to-left    ;; h
  @to-down    ;; j
  @to-up      ;; k
  @to-right   ;; l
  @toggle-caps ;; ret
)
```

>[!info] remember to move `kanata` and `config.kbd` into the folder of your choice
>- for me, that's `/home/kenf/Developer/kanata/`


### friendly guide

| Action                          | Command                                                          |
| ------------------------------- | ---------------------------------------------------------------- |
| Start a service                 | `sudo systemctl start <service>.service`                         |
| Stop a service                  | `sudo systemctl stop <service>.service`                          |
| Enable at boot                  | `sudo systemctl enable <service>.service`                        |
| Disable at boot                 | `sudo systemctl disable <service>.service`                       |
| View logs                       | `journalctl -u <service>.service`                                |
| Reload unit files after editing | `sudo systemctl daemon-reexec` or `sudo systemctl daemon-reload` |
