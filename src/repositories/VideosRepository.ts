import { Repository, getRepository } from 'typeorm';
import IVideosRepository from './IVideosRepository';
import Video from '../models/Video';
import ICreateVideoDTO from '../DTOS/ICreateVideoDTO';

class VideosRepository implements IVideosRepository {
  private ormRepository: Repository<Video>;

  constructor() {
    this.ormRepository = getRepository(Video);
  }

  public async create({
    user,
    description,
    title,
  }: ICreateVideoDTO): Promise<Video> {
    const newVideo = this.ormRepository.create({
      user,
      description,
      title,
      views: 0,
    });

    const video = await this.ormRepository.save(newVideo);

    return video;
  }

  public async find(id: string): Promise<Video | undefined> {
    const video = await this.ormRepository.findOne({
      where: { id },
    });

    return video;
  }

  public async save(video: Video): Promise<Video> {
    return this.ormRepository.save(video);
  }
}

export default VideosRepository;
