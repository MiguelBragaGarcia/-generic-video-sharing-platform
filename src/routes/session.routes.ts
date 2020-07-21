import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const authenticateUserService = new AuthenticateUserService();

  const { email, password } = request.body;

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionRouter;
