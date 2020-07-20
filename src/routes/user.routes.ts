import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

const createUserService = new CreateUserService();

userRouter.get('/', (request, response) => {
  response.json();
});

userRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const newUser = await createUserService.execute({ name, password, email });

  return response.json(newUser);
});

export default userRouter;
