import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';
import { celebrate, Joi, Segments } from 'celebrate';
import { classToClass } from 'class-transformer';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

const upload = multer(uploadConfig.multer);

const userRouter = Router();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const createUserService = container.resolve(CreateUserService);

    const { name, email, password } = request.body;

    const user = await createUserService.execute({ name, password, email });

    return response.json(classToClass(user));
  }
);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    return response.json(classToClass(user));
  }
);

export default userRouter;
