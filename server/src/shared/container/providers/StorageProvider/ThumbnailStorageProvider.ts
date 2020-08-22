import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import StorageProvider from './implementations/DiskStorageProviderThumbnail';

container.registerSingleton<IStorageProvider>(
  'ThumbnailStorageProvider',
  StorageProvider
);
