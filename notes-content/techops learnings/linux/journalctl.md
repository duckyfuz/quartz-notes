---
tags:
  - techops
  - linux
  - journalctl
---
```bash
# Basic viewing
journalctl                          # Show all journal entries
journalctl -b                       # Show logs from current boot
journalctl -b -1                    # Show logs from previous boot
journalctl --list-boots             # List all system boots

# Time-based filtering
journalctl --since "1 hour ago"     # Last hour
journalctl --since "2 days ago"     # Last two days
journalctl --since "2015-06-26 23:15:00" --until "2015-06-26 23:20:00"

# Filter by service/unit
journalctl -u nginx.service         # Show logs for specific service
journalctl -u nginx.service -u mysql.service  # Multiple services

# Real-time monitoring
journalctl -f                       # Follow logs (like tail -f)
journalctl -u mysql.service -f      # Follow specific service

# Output control
journalctl -n 50                    # Show last 50 entries
journalctl -n 50 --since "1 hour ago"
journalctl -r                       # Reverse chronological order
journalctl -u sshd.service -r -n 10

# Output formatting
journalctl -o json                  # JSON format (one line)
journalctl -o json-pretty           # Pretty JSON format
journalctl -o verbose               # Detailed verbose output
journalctl -o cat                   # Minimal output (no timestamps)
journalctl -o short                 # Default syslog style
journalctl -o short-monotonic       # Precise timestamps

# Filter by priority
journalctl -p "emerg".."crit"       # Priority range (emergency to critical)
journalctl -b -1 -p "emerg".."crit" # From previous boot

# Filter by user
journalctl _UID=108                 # Show logs from specific user ID
```

#techops #linux #journalctl 