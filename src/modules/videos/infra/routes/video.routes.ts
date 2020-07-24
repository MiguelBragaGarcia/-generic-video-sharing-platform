import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UploadVideoService from '@modules/videos/services/UploadVideoService';
import CreateVideoService from '@modules/videos/services/CreateVideoService';
import DeleteVideoService from '@modules/videos/services/DeleteVideoService';
import UpdateVideoService from '@modules/videos/services/UpdateVideoService';

import DiskStorageProviderVideo from '@shared/providers/StorageProvider/implementations/DiskStorageProviderVideo';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

import VideosRepository from '../typeorm/repositories/VideosRepository';

const videoRouter = Router();
const upload = multer(uploadConfig.multer);

videoRouter.use(ensureAuthenticated);

videoRouter.post('/', async (request, response) => {
  const videosRepository = new VideosRepository();
  const usersRepository = new UsersRepository();

  const createVideoService = new CreateVideoService(
    videosRepository,
    usersRepository
  );

  const user_id = request.user.id;

  const video = await createVideoService.execute({
    user_id,
  });

  return response.json(video);
});

videoRouter.put('/', async (request, response) => {
  const videosRepository = new VideosRepository();

  const updateVideoService = new UpdateVideoService(videosRepository);

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
  const videosRepository = new VideosRepository();
  const storageProvider = new DiskStorageProviderVideo();

  const deleteVideoService = new DeleteVideoService(
    storageProvider,
    videosRepository
  );

  const user_id = request.user.id;
  const { video_id } = request.body;

  await deleteVideoService.execute({ user_id, video_id });

  return response.status(204).json();
});

videoRouter.patch('/', upload.single('video'), async (request, response) => {
  const videosRepository = new VideosRepository();
  const storageProvider = new DiskStorageProviderVideo();

  const uploadVideoService = new UploadVideoService(
    videosRepository,
    storageProvider
  );

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
