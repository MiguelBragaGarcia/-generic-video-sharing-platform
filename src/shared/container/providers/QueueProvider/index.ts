import { container } from 'tsyringe';

import IQueueProvider from './models/IQueueProvider';
import BeeQueueProvider from './implementations/BeeQueueProvider';

container.registerSingleton<IQueueProvider>('QueueProvider', BeeQueueProvider);
