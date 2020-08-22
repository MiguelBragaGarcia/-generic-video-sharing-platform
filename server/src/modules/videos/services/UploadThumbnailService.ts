import { injectable, inject } from 'tsyringe';

import Video from '@modules/videos/infra/typeorm/entities/Video';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IVideosRepository from '../repositories/IVideosRepository';

interface IRequest {
  video_id: string;
  user_id: string;
  thumbnail_filename: string;
}
@injectable()
class UploadThumbnailService {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,
    @inject('ThumbnailStorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    video_id,
    user_id,
    thumbnail_filename,
  }: IRequest): Promise<Video> {
    const video = await this.videosRepository.findById(video_id);

    if (!video) {
      await this.storageProvider.deleteFileFailUpload(thumbnail_filename);
      throw new AppError('Invalid video ID');
    }

    if (video.user.id !== user_id) {
      await this.storageProvider.deleteFileFailUpload(thumbnail_filename);
      throw new AppError("You cannot change someone else's thumbnail video");
    }

    const filename = await this.storageProvider.saveFile(thumbnail_filename);

    if (video.thumbnail) {
      await this.storageProvider.deleteFile(video.thumbnail);
    }

    video.thumbnail = filename;

    await this.videosRepository.save(video);

    return video;
  }
}
export default UploadThumbnailService;
