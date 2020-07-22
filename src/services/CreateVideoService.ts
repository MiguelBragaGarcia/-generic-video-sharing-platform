import VideosRepository from '../repositories/VideosRepository';

import Video from '../models/Video';
import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';

interface IRequest {
  user_id: string;
  title: string;
  description: string;
}

class CreateVideoService {
  public async execute({
    user_id,
    title,
    description,
  }: IRequest): Promise<Video> {
    const videosRepository = new VideosRepository();
    const userRepository = new UsersRepository();

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('This user does not exists');
    }

    const createdVideo = await videosRepository.create({
      user,
      title,
      description,
    });

    return createdVideo;
  }
}

export default CreateVideoService;
