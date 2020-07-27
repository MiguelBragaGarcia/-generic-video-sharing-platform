import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import UploadVideoController from '../controllers/UploadVideoController';
import VideosController from '../controllers/VideosController';

const videoRouter = Router();
const upload = multer(uploadConfig.multer);

videoRouter.use(ensureAuthenticated);
const uploadVideoController = new UploadVideoController();
const videosController = new VideosController();

videoRouter.post('/', videosController.create);

videoRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      video_id: Joi.string().required(),
    },
  }),
  videosController.update
);

videoRouter.delete(
  '/',
  celebrate({
    [Segments.BODY]: {
      video_id: Joi.string().required(),
    },
  }),
  videosController.delete
);

videoRouter.patch(
  '/',
  upload.single('video'),
  celebrate({
    [Segments.BODY]: {
      video_id: Joi.string().required(),
    },
  }),
  uploadVideoController.update
);

export default videoRouter;
