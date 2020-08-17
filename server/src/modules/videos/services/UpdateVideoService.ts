import { injectable, inject } from 'tsyringe';

import Video from '@modules/videos/infra/typeorm/entities/Video';
import AppError from '@shared/errors/AppError';

import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import IVideosRepository from '../repositories/IVideosRepository';

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
    private videosRepository: IVideosRepository,

    @inject('QueueProvider')
    private queueProvider: IQueueProvider
  ) {}

  public async execute({
    video_id,
    user_id,
    title,
    description,
  }: IRequest): Promise<Video> {
    const video = await this.videosRepository.findById(video_id);

    if (!video) {
      throw new AppError('Video not found');
    }

    if (video.user.id !== user_id) {
      throw new AppError('You can only change your own videos');
    }

    video.title = title;
    video.description = description;

    await this.queueProvider.addJob({ job: video, key: 'CreateVideoTags' });

    await this.videosRepository.save(video);

    return video;
  }
}

export default UpdateVideoService;
