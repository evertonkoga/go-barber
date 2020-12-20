import { container } from 'tsyringe';

import DisckStorageProvider from './storageProvider/implementations/DiskStorageProvider';
import IStorageProvider from './storageProvider/models/IStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DisckStorageProvider,
);
