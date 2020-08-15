import IVideosRepository from '@modules/videos/repositories/IVideosRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import IPaginateOptionsDTO from '@modules/videos/dtos/IPaginateOptionsDTO';
import Video from '@modules/videos/infra/typeorm/entities/Video';
import { uuid } from 'uuidv4';

class FakeVideosRepository implements IVideosRepository {
  private videos: Video[] = [];

  public async create(user: User): Promise<Video> {
    const video = new Video();

    Object.assign(video, {
      id: uuid(),
      title: '',
      description: '',
      user,
      views: 0,
    });

    this.videos.push(video);

    return video;
  }

  public async findById(id: string): Promise<Video | undefined> {
    const video = this.videos.find((storagedVideo) => storagedVideo.id === id);

    return video;
  }

  public async delete(video_id: string): Promise<void> {
    const videoIndex = this.videos.findIndex((video) => video.id === video_id);

    this.videos.splice(videoIndex, 1);
  }

  public async save(video: Video): Promise<Video> {
    const videoIndex = this.videos.findIndex(
      (storagedVideo) => storagedVideo.id === video.id
    );

    this.videos[videoIndex] = video;

    return video;
  }

  public async find({
    take,
    skip,
  }: IPaginateOptionsDTO): Promise<Video[] | undefined> {
    let formattedSkip = -1;
    if (skip > 0) {
      formattedSkip = skip - 1;
    }

    const videos = this.videos.filter(
      (video, index) => index > formattedSkip && index <= formattedSkip + take
    );

    return videos;
  }

  public async findByIds(ids: string[]): Promise<Video[] | undefined> {
    const video = this.videos.filter((storagedVideos) => {
      const matchId = ids.find((id) => id === storagedVideos.id);

      if (matchId) {
        return true;
      }

      return false;
    });

    return video;
  }
}

export default FakeVideosRepository;
