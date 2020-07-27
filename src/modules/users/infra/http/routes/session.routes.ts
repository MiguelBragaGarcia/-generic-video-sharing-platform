import { Router } from 'express';
import { container } from 'tsyringe';
import { celebrate, Joi, Segments } from 'celebrate';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import { classToClass } from 'class-transformer';

const sessionRouter = Router();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const authenticateUserService = container.resolve(AuthenticateUserService);

    const { email, password } = request.body;

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
);

export default sessionRouter;
