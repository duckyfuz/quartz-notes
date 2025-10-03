- improve read performance at the expense of some write performance
- redundant copies of the data are written in multiple tables to avoid expensive joins
- some RDBMS support materialized views
	- handles storing redundant information and keeping redundant copies consistent

##### disadvantages
- duplication of data
- constraints can help redundant copies of information stay in sync, which increases complexity of the database design.
- might perform worse under heavy write load compared to its normalized counterpart