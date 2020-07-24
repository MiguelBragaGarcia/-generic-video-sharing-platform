import Video from '../models/Video';

import VideosRepository from '../repositories/VideosRepository';

import DiskStorageProviderVideo from '../Providers/StorageProvider/implementations/DiskStorageProviderVideo';

import AppError from '../errors/AppError';

interface IRequest {
  video_id: string;
  user_id: string;
  video_filename: string;
}

class UploadVideoService {
  public async execute({
    video_id,
    user_id,
    video_filename,
  }: IRequest): Promise<Video> {
    const videosRepository = new VideosRepository();

    const storageProvider = new DiskStorageProviderVideo();

    const video = await videosRepository.findById(video_id);

    if (!video) {
      throw new AppError('Invalid video ID');
    }

    if (video.user.id !== user_id) {
      throw new AppError("You cannot change someone else's video");
    }

    const filename = await storageProvider.saveFile(video_filename);

    video.video = filename;

    await videosRepository.save(video);

    return video;
  }
}
export default UploadVideoService;
