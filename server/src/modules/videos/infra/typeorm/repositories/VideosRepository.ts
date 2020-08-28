import { Repository, getRepository } from 'typeorm';

import IVideosRepository from '@modules/videos/repositories/IVideosRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IPaginateOptionsDTO from '@modules/videos/dtos/IPaginateOptionsDTO';
import Video from '../entities/Video';

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
      thumbnail: '',
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

  public async find({
    take,
    skip,
  }: IPaginateOptionsDTO): Promise<Video[] | undefined> {
    return this.ormRepository.find({
      take,
      skip,
    });
  }

  public async findByIds(ids: string[]): Promise<Video[] | undefined> {
    return this.ormRepository.findByIds(ids);
  }

  public async findAllByUser(user_id:string):Promise<Video[]| undefined> {
    return this.ormRepository.find({ where: {user: user_id}})
  }
}

export default VideosRepository;
