import User from '../models/User';

import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';
import DiskStorageProvider from '../Providers/StorageProvider/implementations/DiskStorageProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const storageProvider = new DiskStorageProvider();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar');
    }

    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar);
    }

    const filename = await storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
