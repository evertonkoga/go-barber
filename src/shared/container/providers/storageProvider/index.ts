import { container } from 'tsyringe';

import IStorageProvider from './models/IStorageProvider';
import DisckStorageProvider from './implementations/DiskStorageProvider';

const providers = {
  disck: DisckStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disck,
);

