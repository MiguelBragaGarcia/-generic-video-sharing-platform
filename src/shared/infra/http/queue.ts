import 'reflect-metadata';

import '@shared/infra/typeorm';
import '@shared/container';

import Queue from '@shared/container/providers/QueueProvider/implementations/BeeQueueProvider';
import { container } from 'tsyringe';

const queue = container.resolve(Queue);

queue.processQueue();
