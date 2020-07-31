import 'reflect-metadata';

import Queue from '@shared/container/providers/QueueProvider/implementations/BeeQueueProvider';

const queue = new Queue();

queue.processQueue();
