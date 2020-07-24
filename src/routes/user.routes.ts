import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const upload = multer(uploadConfig.multer);

const userRouter = Router();

const createUserService = new CreateUserService();
const updateUserAvatarService = new UpdateUserAvatarService();

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const newUser = await createUserService.execute({ name, password, email });

  return response.json(newUser);
});

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(user);
  }
);

export default userRouter;
