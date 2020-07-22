import { Router } from 'express';
import CreateVideoService from '../services/CreateVideoService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const videoRouter = Router();

videoRouter.use(ensureAuthenticated);

const createVideoService = new CreateVideoService();

videoRouter.post('/', async (request, response) => {
  const { title, description } = request.body;
  const user_id = request.user.id;

  const video = await createVideoService.execute({
    user_id,
    title,
    description,
  });

  return response.json(video);
});

export default videoRouter;
