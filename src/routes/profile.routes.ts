import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UpdateProfileService from '../services/UpdateProfileService';

const profileRouter = Router();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', async (request, response) => {
  const updateProfileService = new UpdateProfileService();
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
