import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import StorageProvider from './implementations/DiskStorageProviderVideo';

container.registerSingleton<IStorageProvider>(
  'VideoStorageProvider',
  StorageProvider
);
