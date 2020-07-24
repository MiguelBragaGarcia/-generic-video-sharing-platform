import Video from '@modules/videos/infra/typeorm/entities/Video';
import AppError from '@shared/errors/AppError';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import VideosRepository from '@modules/videos/infra/typeorm/repositories/VideosRepository';

interface IRequest {
  user_id: string;
}

class CreateVideoService {
  public async execute({ user_id }: IRequest): Promise<Video> {
    const videosRepository = new VideosRepository();
    const userRepository = new UsersRepository();

    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new AppError('This user does not exists');
    }

    const createdVideo = await videosRepository.create(user);

    return createdVideo;
  }
}

export default CreateVideoService;
