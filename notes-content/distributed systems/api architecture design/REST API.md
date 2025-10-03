a basic HTTP request consists of a verb (method) and a resource (endpoint)

| Verb   | Description                                                | Idempotent* | Safe | Cacheable                               |
| ------ | ---------------------------------------------------------- | ----------- | ---- | --------------------------------------- |
| GET    | Reads a resource                                           | Yes         | Yes  | Yes                                     |
| POST   | Creates a resource or triggers a process that handles data | No          | No   | Yes if response contains freshness info |
| PUT    | Creates or replaces a resource                             | Yes         | No   | No                                      |
| PATCH  | Partially updates a resource                               | No          | No   | Yes if response contains freshness info |
| DELETE | Deletes a resource                                         | Yes         | No   | No                                      |
\*can be called many times without different outcomes

- **loosely coupled**