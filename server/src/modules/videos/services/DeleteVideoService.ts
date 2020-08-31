import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IVideosRepository from '../repositories/IVideosRepository';
import ITagsRepository from '../repositories/ITagsRepository';

interface IRequest {
  video_id: string;
  user_id: string;
}
@injectable()
class DeleteVideoService {
  constructor(
    @inject('VideoStorageProvider')
    private videoStorageProvider: IStorageProvider,
    @inject('ThumbnailStorageProvider')
    private thumbnailStorageProvider: IStorageProvider, 

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository,
    @inject('VideosRepository')
    private videosRepository: IVideosRepository
  ) {}

  public async execute({ video_id, user_id }: IRequest): Promise<void> {
    const video = await this.videosRepository.findById(video_id);

    if (!video) {
      throw new AppError('Invalid video ID');
    }

    if (video.user.id !== user_id) {
      throw new AppError('You can only delete your own videos');
    }

    if (video.video) {
      await this.videoStorageProvider.deleteFile(video.video);
    }

    if (video.thumbnail){
      await this.thumbnailStorageProvider.deleteFile(video.thumbnail);
    }

    await this.tagsRepository.delete(video.id);

    await this.videosRepository.delete(video.id);
  }
}
export default DeleteVideoService;
