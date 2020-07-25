import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import StorageProvider from './implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'AvatarStorageProvider',
  StorageProvider
);
