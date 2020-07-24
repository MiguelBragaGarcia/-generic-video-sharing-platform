import Video from '@modules/videos/infra/typeorm/entities/Video';
import User from '@modules/users/infra/typeorm/entities/User';

export default interface IVideosRepository {
  findById(id: string): Promise<Video | undefined>;
  create(user: User): Promise<Video>;
  save(video: Video): Promise<Video>;
  delete(video_id: string): Promise<void>;
}
