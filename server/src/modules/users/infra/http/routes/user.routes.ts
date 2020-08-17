import { Router } from 'express';
import multer from 'multer';

import { celebrate, Joi, Segments } from 'celebrate';

import uploadConfig from '@config/upload';
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';
import AvatarController from '../controllers/AvatarController';

const upload = multer(uploadConfig.multer);

const userRouter = Router();

const usersController = new UsersController();
const avatarController = new AvatarController();

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create
);

userRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  avatarController.update
);

export default userRouter;
