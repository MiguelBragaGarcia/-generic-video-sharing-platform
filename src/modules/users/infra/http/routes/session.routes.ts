import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const hashProvider = new BCryptHashProvider();

  const authenticateUserService = new AuthenticateUserService(
    usersRepository,
    hashProvider
  );

  const { email, password } = request.body;

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionRouter;
