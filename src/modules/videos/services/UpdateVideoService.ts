import Video from '@modules/videos/infra/typeorm/entities/Video';

import AppError from '@shared/errors/AppError';
import VideosRepository from '@modules/videos/infra/typeorm/repositories/VideosRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

interface IRequest {
  video_id: string;
  user_id: string;
  title: string;
  description: string;
}

class UpdateVideoService {
  public async execute({
    video_id,
    user_id,
    title,
    description,
  }: IRequest): Promise<Video> {
    const videosRepository = new VideosRepository();
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id); // Refletir se realmente precisa disso -> O usuário já está logado, eu preciso verificar se ele existe?

    if (!user) {
      throw new AppError('User not found');
    }

    const video = await videosRepository.findById(video_id);

    if (!video) {
      throw new AppError('Video not found');
    }

    if (video.user.id !== user_id) {
      throw new AppError('You can only change your own videos');
    }

    // View count entry her.
    video.title = title;
    video.description = description;

    await videosRepository.save(video);

    return video;
  }
}

export default UpdateVideoService;
