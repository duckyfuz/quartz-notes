- designed to process large amounts of messages and run tasks concurrently, allowing for greater scalability and efficiency in executing workloads


##### key concepts
- async task execution: offload heavy computations or long-running tasks to prevent blocking the main application
- distributed: can be deployed across multiple machines to balance the load and improve performance
- brokers & workers: supports several message brokers such as RabbitMQ and Redis
	- Celery workers are separate processes that run in the background, continuously listening for and executing tasks when they are received
	- workers can be scaled up or down based on demand to handle more tasks concurrently
- results backend: after task excecution, Celery can store task states and results
	- results backend can be a database, a key-value store, or other storage services like Redis, RPC (RabbitMQ), or even a custom solution
- task retries: can specify retry intervals and limits
	- also supports custom error handling to manage the different situations that might occur during task processing
- periodic tasks: has a scheduler to handle periodic tasks, similar to CRON jobs
- task workflow: supports complex workflows where tasks can be chained together, executed in parallel, or handled using other paradigms such as groups and chords
