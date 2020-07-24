import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/providers/StorageProvider/models/IStorageProvider';
import IVideosRepository from '../repositories/IVideosRepository';

interface IRequest {
  video_id: string;
  user_id: string;
}

class DeleteVideoService {
  constructor(
    private storageProvider: IStorageProvider,
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
      await this.storageProvider.deleteFile(video.video);
    }

    await this.videosRepository.delete(video.id);
  }
}
export default DeleteVideoService;
