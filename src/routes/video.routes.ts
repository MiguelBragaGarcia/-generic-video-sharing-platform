import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import CreateVideoService from '../services/CreateVideoService';
import UploadVideoService from '../services/UploadVideoService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const videoRouter = Router();
const upload = multer(uploadConfig.multer);

videoRouter.use(ensureAuthenticated);

const createVideoService = new CreateVideoService();
const uploadVideoService = new UploadVideoService();

const video_id = '';

/**
 * Ideia de como fazer o upload do vídeo.
 * Como o upload da video demora e dependemos dela para a criação completa do vídeo no banco de dados
 * Temos que criar um proto-vídeo vazio no banco de dados e depois ir inserindo os dados de acordo com o que for preenchendo
 * Nesse caso criar antes a representação no banco de dados e depois preencher as informações.
 *
 */

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

videoRouter.patch('/', upload.single('video'), async (request, response) => {
  const user_id = request.user.id;

  const video = await uploadVideoService.execute({
    user_id,
    video_id,
    video_filename: request.file.filename,
  });

  return response.json(video);
});
export default videoRouter;
