import { Repository, getRepository } from 'typeorm';
import IVideosRepository from './IVideosRepository';

import Video from '../models/Video';
import User from '../models/User';

class VideosRepository implements IVideosRepository {
  private ormRepository: Repository<Video>;

  constructor() {
    this.ormRepository = getRepository(Video);
  }

  public async create(user: User): Promise<Video> {
    const newVideo = this.ormRepository.create({
      user,
      title: '',
      description: '',
      video: '',
      views: 0,
    });

    const video = await this.ormRepository.save(newVideo);

    return video;
  }

  public async findById(id: string): Promise<Video | undefined> {
    const video = await this.ormRepository.findOne({
      where: { id },
    });

    return video;
  }

  public async delete(video_id: string): Promise<void> {
    await this.ormRepository.delete(video_id);
  }

  public async save(video: Video): Promise<Video> {
    return this.ormRepository.save(video);
  }
}

export default VideosRepository;
