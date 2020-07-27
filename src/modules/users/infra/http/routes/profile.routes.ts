import { Router } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import { celebrate, Segments, Joi } from 'celebrate';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  async (request, response) => {
    const updateProfileService = container.resolve(UpdateUserProfileService);
    const user_id = request.user.id;

    const { name, email, password, old_password } = request.body;

    const user = await updateProfileService.execute({
      id: user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(classToClass(user));
  }
);

export default profileRouter;
