import { injectable, inject } from 'tsyringe';

import Video from '@modules/videos/infra/typeorm/entities/Video';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IVideosRepository from '../repositories/IVideosRepository';

interface IRequest {
  video_id: string;
  user_id: string;
  video_filename: string;
}
@injectable()
class UploadVideoService {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
    @inject('VideoStorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    video_id,
    user_id,
    video_filename,
  }: IRequest): Promise<Video> {
    const video = await this.videosRepository.findById(video_id);

    if (!video) {
      throw new AppError('Invalid video ID');
    }

    if (video.user.id !== user_id) {
      throw new AppError("You cannot change someone else's video");
    }

    const filename = await this.storageProvider.saveFile(video_filename);

    video.video = filename;

    await this.videosRepository.save(video);

    return video;
  }
}
export default UploadVideoService;
