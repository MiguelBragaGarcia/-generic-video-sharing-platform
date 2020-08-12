import { injectable, inject, container } from 'tsyringe';

import Video from '@modules/videos/infra/typeorm/entities/Video';
import AppError from '@shared/errors/AppError';

import IVideosRepository from '../repositories/IVideosRepository';
import CreateVideoTagService from './CreateVideoTagService';
import CreateVideoService from './CreateVideoService';

interface IRequest {
  video_id: string;
  user_id: string;
  title: string;
  description: string;
}
@injectable()
class UpdateVideoService {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository
  ) {}

  public async execute({
    video_id,
    user_id,
    title,
    description,
  }: IRequest): Promise<Video> {
    const createVideoTags = container.resolve(CreateVideoTagService);
    const video = await this.videosRepository.findById(video_id);

    if (!video) {
      throw new AppError('Video not found');
    }

    if (video.user.id !== user_id) {
      throw new AppError('You can only change your own videos');
    }

    video.title = title;
    video.description = description;

    await createVideoTags.execute(video);

    await this.videosRepository.save(video);

    return video;
  }
}

export default UpdateVideoService;
