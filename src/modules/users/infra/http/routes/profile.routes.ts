import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import UpdateProfileService from '@modules/users/services/UpdateUserProfileService';

import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const hashProvider = new BCryptHashProvider();

  const updateProfileService = new UpdateProfileService(
    usersRepository,
    hashProvider
  );
  const user_id = request.user.id;

  const { name, email, password, old_password } = request.body;

  const user = await updateProfileService.execute({
    id: user_id,
    name,
    email,
    password,
    old_password,
  });

  delete user.password;

  return response.json(user);
});

export default profileRouter;
