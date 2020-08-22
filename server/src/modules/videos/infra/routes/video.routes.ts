import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAuthenticated';
import UploadVideoController from '../controllers/UploadVideoController';
import VideosController from '../controllers/VideosController';

import UploadThumbnailController from '../controllers/UploadThumbnailController';

const videoRouter = Router();
const upload = multer(uploadConfig.multer);

const uploadThumbnailController = new UploadThumbnailController();
const uploadVideoController = new UploadVideoController();
const videosController = new VideosController();

videoRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      page: Joi.string().required(),
    },
  }),
  videosController.index
);

videoRouter.get(
  '/:video_id',
  celebrate({
    [Segments.PARAMS]: {
      video_id: Joi.string().uuid().required(),
    },
  }),
  videosController.show
);

videoRouter.use(ensureAuthenticated);

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

videoRouter.patch(
  '/thumbnail',
  upload.single('thumbnail'),
  celebrate({
    [Segments.BODY]: {
      video_id: Joi.string().required(),
    },
  }),
  uploadThumbnailController.update
);

export default videoRouter;
