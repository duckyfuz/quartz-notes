- MySQL is preferred for managing read-only operations - not for concurrency
- PostgreSQL is preferred for read-write operations, large datasets, and complex queries - not for read-only operations

- PostgreSQL is ACID-compliant, MySQL is not (depending on engine)
	- optimal when concurrent transactions are required, but slower and less stable for read-only operations
- MySQL is highly compatible with many different types of data storage engines - PostgreSQL is highly compatible with many different NoSQL formats

### What's ACID?
**Atomicity**: Ensures "all or nothing"
- each transaction is treated as a single, indivisible unit - eg.
```
BEGIN;
UPDATE accounts SET balance = balance - 100.00 WHERE name = 'Alice';
UPDATE accounts SET balance = balance + 100.00 WHERE name = 'Bob';
COMMIT;
```
**Consistency**: Ensures that a transaction brings the DB from one valid state to another (not data consistency between different nodes)
- data must be valid - eg. data types, unique keys, foreign keys
**Isolation**: Ensures that concurrently executing transactions do not interfere with each other
- result of multiple concurrent transactions should be the same as if they were executed sequentially, one after another (though not necessarily in the same order)
- Prevents the following concurrency-related problems:
	- Dirty reads: Reading data that has been modified by another transaction but not yet committed.
	- Non-repeatable reads: Getting different results when reading the same row multiple times within a single transaction because another transaction modified it in between reads.
	- Phantom reads: Getting different sets of rows when running the same query multiple times within a single transaction because another transaction inserted or deleted rows that match the query criteria.
**Durability**: Guarantees that once a transaction has been successfully committed, its changes are permanent and will survive any subsequent system failures