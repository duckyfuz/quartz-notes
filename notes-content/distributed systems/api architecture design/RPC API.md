- a client causes a procedure to execute on a different address space, usually a remote server. The procedure is coded as if it were a local procedure call, abstracting away the details of how to communicate with the server from the client program
```
GET /someoperation?data=anId

POST /anotheroperation
{
  "data":"anId";
  "anotherdata": "another value"
}
```
- RPC is focused on exposing behaviors. RPCs are often used for performance reasons with internal communications, as you can hand-craft native calls to better fit your use cases

##### disadvantages
- RPC clients become **tightly coupled** to the service implementation
- a new API must be defined for every new operation or use case
- it can be difficult to debug RPC
- you might not be able to leverage existing technologies out of the box
	- eg. it might require additional effort to ensure [RPC calls are properly cached](https://web.archive.org/web/20170608193645/http://etherealbits.com/2012/12/debunking-the-myths-of-rpc-rest/) on caching servers such as [Squid](http://www.squid-cache.org/)