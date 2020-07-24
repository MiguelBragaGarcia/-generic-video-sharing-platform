import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';
import DiskStorageProviderAvatar from '@shared/providers/StorageProvider/implementations/DiskStorageProvider';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const upload = multer(uploadConfig.multer);

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const hashProvider = new BCryptHashProvider();

  const createUserService = new CreateUserService(
    usersRepository,
    hashProvider
  );

  const { name, email, password } = request.body;

  const newUser = await createUserService.execute({ name, password, email });

  return response.json(newUser);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const usersRepository = new UsersRepository();
    const storageProvider = new DiskStorageProviderAvatar();

    const updateUserAvatarService = new UpdateUserAvatarService(
      usersRepository,
      storageProvider
    );

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  }
);

export default userRouter;
