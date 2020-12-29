import { container } from 'tsyringe';

import IStorageProvider from './storageProvider/models/IStorageProvider';
import DisckStorageProvider from './storageProvider/implementations/DiskStorageProvider';

import IMailProvider from './mailProvider/models/IMailProvider';
import EtherealMailProvider from './mailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DisckStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
