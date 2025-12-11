---
tags:
  - techops
  - host-authentication
  - ldap
---
### why is LDAP used?
- centralized identity management: one directory for all users, groups, hosts, and services
- security and compliance
- scalability and performance: handles millions of entries with replication and caching
- standardization: works across different systems and applications - eg. Windows AD, Linux servers, network devices

### how does LDAP work?
```
1. User → Application: Enters username/password
2. Application → LDAP Server: Binds with service account
3. Application → LDAP Server: Searches for user DN
4. Application → LDAP Server: Attempts bind with user DN + password
5. LDAP Server: Validates credentials
6. LDAP Server → Application: Success/Failure + user attributes
7. Application: Grants/denies access
```

### what use cases are there?
- system login authentication - eg.
	- linux / unix servers authenticating against LDAP
	- windows Active Directory (AD is LDAP-based)
	- network equipment (routers, switches, firewalls)
- API and service authentication - eg. 
	- microservices authenticating against central directory
	- service-to-service authentication
	- machine accounts for automated processes
- application authentication - eg.
	- custom business applications

#techops #host-authentication #ldap 