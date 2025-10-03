VSC neovim setup: [neovim w. side terminal](https://medium.com/@nikmas_dev/vscode-neovim-setup-keyboard-centric-powerful-reliable-clean-and-aesthetic-development-582d34297985)

karabiner config:
```
{
    "description": "CAPS+H/J/K/L › ←↓↑→, CAPS+D/U › PG↓↑",
    "manipulators": [
        {
            "conditions": [
                {
                    "name": "caps_lock pressed",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "j",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "down_arrow" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_lock pressed",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "k",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "up_arrow" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_lock pressed",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "h",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "left_arrow" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_lock pressed",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "l",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "right_arrow" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_lock pressed",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "d",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "page_down" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_lock pressed",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "u",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "page_up" }],
            "type": "basic"
        },
        {
            "from": {
                "key_code": "caps_lock",
                "modifiers": { "optional": ["any"] }
            },
            "to": [
                {
                    "set_variable": {
                        "name": "caps_lock pressed",
                        "value": 1
                    }
                }
            ],
            "to_after_key_up": [
                {
                    "set_variable": {
                        "name": "caps_lock pressed",
                        "value": 0
                    }
                }
            ],
            "type": "basic"
        }
    ]
}
```
```
{
    "description": "CAPS+↩︎ › CAPS",
    "manipulators": [
        {
            "conditions": [
                {
                    "name": "caps_lock pressed",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "return_or_enter",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "caps_lock" }],
            "type": "basic"
        },
        {
            "conditions": [
                {
                    "name": "caps_lock pressed",
                    "type": "variable_if",
                    "value": 1
                }
            ],
            "from": {
                "key_code": "tab",
                "modifiers": { "optional": ["any"] }
            },
            "to": [{ "key_code": "escape" }],
            "type": "basic"
        }
    ]
}
```

speeding up repeated keypresses:
```
defaults write -g ApplePressAndHoldEnabled -bool true
defaults write -g InitialKeyRepeat -int 10
defaults write -g KeyRepeat -int 1
```

speeding up hidden dock:
```
defaults write com.apple.dock autohide-time-modifier -float 0.4
defaults write com.apple.dock autohide-delay -float 0
killall Dock
```

better git lg:
```
git config --global alias.lg "log --graph --pretty=tformat:'%Cred%h%Creset -%C(auto)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit --decorate=full"
```

vimium options
![[Vimium Options.json]]

**nvim config** (`~/.config/nvim/init.vim`)
```
set tabstop=4  
set shiftwidth=4
```
