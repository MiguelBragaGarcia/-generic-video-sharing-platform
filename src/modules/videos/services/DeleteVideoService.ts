import AppError from '@shared/errors/AppError';
import VideosRepository from '@modules/videos/infra/typeorm/repositories/VideosRepository';
import DiskStorageProvider from '@shared/providers/StorageProvider/implementations/DiskStorageProviderVideo';

interface IRequest {
  video_id: string;
  user_id: string;
}

class DeleteVideoService {
  public async execute({ video_id, user_id }: IRequest): Promise<void> {
    const storageProvider = new DiskStorageProvider();
    const videosRepository = new VideosRepository();

    const video = await videosRepository.findById(video_id);

    if (!video) {
      throw new AppError('Invalid video ID');
    }

    if (video.user.id !== user_id) {
      throw new AppError('You can only delete your own videos');
    }

    if (video.video) {
      await storageProvider.deleteFile(video.video);
    }

    await videosRepository.delete(video.id);
  }
}
export default DeleteVideoService;
