import ICreateVideoDTO from '../DTOS/ICreateVideoDTO';
import Video from '../models/Video';

export default interface IVideosRepository {
  find(id: string): Promise<Video | undefined>;
  create({ title, description }: ICreateVideoDTO): Promise<Video>;
  save(video: Video): Promise<Video>;
}
