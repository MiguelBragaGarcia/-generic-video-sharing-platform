import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UploadVideoService from '@modules/videos/services/UploadVideoService';
import CreateVideoService from '@modules/videos/services/CreateVideoService';
import DeleteVideoService from '@modules/videos/services/DeleteVideoService';
import UpdateVideoService from '@modules/videos/services/UpdateVideoService';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

const videoRouter = Router();
const upload = multer(uploadConfig.multer);

videoRouter.use(ensureAuthenticated);

const createVideoService = new CreateVideoService();
const uploadVideoService = new UploadVideoService();
const updateVideoService = new UpdateVideoService();
const deleteVideoService = new DeleteVideoService();

videoRouter.post('/', async (request, response) => {
  const user_id = request.user.id;

  const video = await createVideoService.execute({
    user_id,
  });

  return response.json(video);
});

videoRouter.put('/', async (request, response) => {
  const { title, description, video_id } = request.body;
  const user_id = request.user.id;

  const video = await updateVideoService.execute({
    video_id,
    user_id,
    title,
    description,
  });

  return response.json(video);
});

videoRouter.delete('/', async (request, response) => {
  const user_id = request.user.id;
  const { video_id } = request.body;

  await deleteVideoService.execute({ user_id, video_id });

  return response.status(204).json();
});

videoRouter.patch('/', upload.single('video'), async (request, response) => {
  const { video_id } = request.body;
  const user_id = request.user.id;

  const video = await uploadVideoService.execute({
    user_id,
    video_id,
    video_filename: request.file.filename,
  });

  return response.json(video);
});

export default videoRouter;
