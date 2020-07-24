import Video from '@modules/videos/infra/typeorm/entities/Video';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IVideosRepository from '../repositories/IVideosRepository';

interface IRequest {
  user_id: string;
}

class CreateVideoService {
  constructor(
    private videosRepository: IVideosRepository,
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<Video> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('This user does not exists');
    }

    const createdVideo = await this.videosRepository.create(user);

    return createdVideo;
  }
}

export default CreateVideoService;
