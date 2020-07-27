import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';
import { celebrate, Segments, Joi } from 'celebrate';
import { classToClass } from 'class-transformer';

import uploadConfig from '@config/upload';
import UploadVideoService from '@modules/videos/services/UploadVideoService';
import CreateVideoService from '@modules/videos/services/CreateVideoService';
import DeleteVideoService from '@modules/videos/services/DeleteVideoService';
import UpdateVideoService from '@modules/videos/services/UpdateVideoService';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';

const videoRouter = Router();
const upload = multer(uploadConfig.multer);

videoRouter.use(ensureAuthenticated);

videoRouter.post('/', async (request, response) => {
  const createVideoService = container.resolve(CreateVideoService);

  const user_id = request.user.id;

  const video = await createVideoService.execute({
    user_id,
  });

  return response.json(classToClass(video));
});

videoRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      video_id: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const updateVideoService = container.resolve(UpdateVideoService);

    const { title, description, video_id } = request.body;
    const user_id = request.user.id;

    const video = await updateVideoService.execute({
      video_id,
      user_id,
      title,
      description,
    });

    return response.json(classToClass(video));
  }
);

videoRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      video_id: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const deleteVideoService = container.resolve(DeleteVideoService);

    const user_id = request.user.id;
    const { video_id } = request.body;

    await deleteVideoService.execute({ user_id, video_id });

    return response.status(204).json();
  }
);

videoRouter.patch(
  '/',
  upload.single('video'),
  celebrate({
    [Segments.BODY]: {
      video_id: Joi.string().required(),
    },
  }),
  async (request, response) => {
    const uploadVideoService = container.resolve(UploadVideoService);

    const { video_id } = request.body;
    const user_id = request.user.id;

    const video = await uploadVideoService.execute({
      user_id,
      video_id,
      video_filename: request.file.filename,
    });

    return response.json(classToClass(video));
  }
);

export default videoRouter;
