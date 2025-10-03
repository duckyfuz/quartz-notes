all clients connect to a central server via REST API to sync encrypted vault data
- server component is built in C# (.NET Core with ASP.NET Core) with SQL Server backend

employs zero-knowledge, e2e encryption (view [[security & encryption]])
- master password + email -> PBKDF2 -> master key
- a random symmetric key is encrypted with that master key, producing the “protected symmetric key” stored server-side
- only the client can decrypt vault contents; server only holds encrypted blobs & salted hashes for authentication

run on Microsoft Azure
- Microsoft fully manages the control plane - all components and services that are used to operate and maintain the K8s clusters
- team at Bitwarden manages - (1) access management of AKS, (2) patching and updating to apply Node OS security patches, Node image upgrades, K8s version (cluster upgrades)
- container security for docker images and running containers in AKS
- network security of the nodes

code repo follows the C4-model: multiple containers such as Identity, Api, EventsProcessor, Billing, Admin, etc.; each container uses MVC patterns
- components are built modularly - API logic, data models, controllers, etc

authentication flow is as such: 
- login: client sends master password hash -> server compares
- sync: server returns encrypted vault (blob)
- decrypt: done locally using the protected symmetric key derived from master password