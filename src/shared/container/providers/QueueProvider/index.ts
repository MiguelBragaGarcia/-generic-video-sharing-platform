import { container } from 'tsyringe';

import IQueueProvider from './models/IQueueProvider';
import BullQueueProvider from './implementations/BullQueueProvider';

container.registerSingleton<IQueueProvider>('QueueProvider', BullQueueProvider);
