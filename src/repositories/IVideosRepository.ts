import Video from '../models/Video';
import User from '../models/User';

export default interface IVideosRepository {
  findById(id: string): Promise<Video | undefined>;
  create(user: User): Promise<Video>;
  save(video: Video): Promise<Video>;
  delete(video_id: string): Promise<void>;
}
