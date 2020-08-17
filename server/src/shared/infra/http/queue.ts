import 'reflect-metadata';
import 'dotenv/config';
import { container } from 'tsyringe';

import '@shared/infra/typeorm';
import '@shared/container';

import BullQueueProvider from '@shared/container/providers/QueueProvider/implementations/BullQueueProvider';

const queue = container.resolve(BullQueueProvider);

queue.processQueue();
