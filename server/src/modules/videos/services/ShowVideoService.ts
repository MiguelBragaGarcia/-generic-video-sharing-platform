import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Video from '../infra/typeorm/entities/Video';
import IVideosRepository from '../repositories/IVideosRepository';

interface IRequest {
  video_id: string;
}

@injectable()
class ShowVideoService {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository
  ) {}

  public async execute({ video_id }: IRequest): Promise<Video> {
    const video = await this.videosRepository.findById(video_id);

    if (!video) {
      throw new AppError('Video not found');
    }

    video.views += 1;

    await this.videosRepository.save(video);

    return video;
  }
}

export default ShowVideoService;
