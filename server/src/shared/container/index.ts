import { container } from 'tsyringe';

import './providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IVideosRepository from '@modules/videos/repositories/IVideosRepository';
import VideosRepository from '@modules/videos/infra/typeorm/repositories/VideosRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

import ITagsRepository from '@modules/videos/repositories/ITagsRepository';
import TagsRepository from '@modules/videos/infra/typeorm/repositories/TagsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IVideosRepository>(
  'VideosRepository',
  VideosRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);

container.registerSingleton<ITagsRepository>('TagsRepository', TagsRepository);
