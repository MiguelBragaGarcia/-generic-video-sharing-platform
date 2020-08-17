import { container } from 'tsyringe';

import IMailProvider from './models/IMailProvider';
import EtherialMailProvider from './implementations/EtherialMailProvider';

container.registerSingleton<IMailProvider>(
  'MailProvider',
  EtherialMailProvider
);
