---
tags:
  - techops
  - linux
  - systemd
---
```bash
# System state and actions
systemctl is-system-running      # Check overall system health
systemctl reboot                 # Reboot the system
systemctl poweroff               # Power off the system
systemctl suspend                # Suspend the system
systemctl hibernate              # Hibernate the system

# Service management
systemctl status <service>       # Check service status and logs
systemctl start <service>        # Start a service
systemctl stop <service>         # Stop a service
systemctl restart <service>      # Restart a service
systemctl reload <service>       # Reload service configuration
systemctl enable <service>       # Enable service at boot
systemctl disable <service>      # Disable service at boot
systemctl is-enabled <service>   # Check if service is enabled

# Unit management
systemctl list-units             # List all active units
systemctl list-unit-files        # List all installed unit files
systemctl --failed               # List failed units
systemctl list-units --type=service  # Filter by unit type
systemctl cat <unit>             # View unit file content
systemctl show <unit>            # Show unit properties
systemctl list-dependencies <unit>   # List unit dependencies

# Timer management
systemctl list-timers            # List all active timers
systemctl status <timer>         # Check timer details
systemctl enable <timer>         # Enable a timer
systemctl stop <timer>           # Pause a timer
systemctl disable <timer>        # Remove a timer

# Journalctl - Boot process
journalctl -b                    # Show logs from current boot
journalctl -b -1                 # Show logs from previous boot
journalctl --list-boots          # List all system boots

# Journalctl - Time filtering
journalctl --since "1 hour ago"  # Last hour
journalctl --since "30 minutes ago"
journalctl --since "7 days ago"  # Last week
journalctl --since "yesterday"   # Yesterday's logs
journalctl --since "2025-03-15 08:00:00" --until "2025-03-15 18:00:00"

# Journalctl - Application filtering
journalctl -u <unit-name>        # Filter by unit (e.g., nginx.service)
journalctl -k                    # Linux kernel logs
journalctl _UID=1000             # Filter by user ID
journalctl /usr/bin/your_program # Filter by executable

# Journalctl - Priority filtering
journalctl -p 3                  # Priority 3 (errors) and higher
journalctl -p err                # Error messages only
journalctl -p err..alert         # Error, critical, and alert messages

# Journalctl - Real-time and output
journalctl -f                    # Follow logs in real-time
journalctl -n 50                 # Show last 50 entries

# Journalctl - Housekeeping
sudo journalctl --vacuum-time=7d     # Delete logs older than 7 days
sudo journalctl --vacuum-size=500M   # Limit journal size to 500MB
sudo journalctl --vacuum-time="2025-03-01"  # Remove logs before date
sudo rm -rf /var/log/journal/*       # Remove all logs (DANGEROUS)
sudo systemctl restart systemd-journald     # Restart journal service
```

#techops #linux #systemd 