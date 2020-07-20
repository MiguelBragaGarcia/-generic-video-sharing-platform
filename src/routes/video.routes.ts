import { Router } from 'express';

const videoRouter = Router();

interface VideoData {
  id: string;
  titulo: string;
  descricao: string;
  vizualizacao: number;
}

const videos: VideoData[] = [];

videoRouter.get('/', (request, response) => {
  return response.json(videos);
});

videoRouter.post('/', (request, response) => {
  const { titulo, descricao } = request.body;

  const lastIndex = videos.length;

  const newVideo = {
    id: String(lastIndex + 1),
    titulo,
    descricao,
    vizualizacao: 0,
  };

  videos.push(newVideo);

  return response.json(newVideo);
});

export default videoRouter;
