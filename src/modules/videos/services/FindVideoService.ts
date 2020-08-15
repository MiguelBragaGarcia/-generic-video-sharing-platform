import { injectable, inject } from 'tsyringe';

import Video from '../infra/typeorm/entities/Video';
import IVideosRepository from '../repositories/IVideosRepository';
import ITagsRepository from '../repositories/ITagsRepository';
import sanitizeString from '../utils/sanitizeString';

@injectable()
class FindVideoService {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository,

    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  public async execute(searchTags: string): Promise<Video[] | undefined> {
    const sanitizeSearchTags = sanitizeString(searchTags);

    const videosContainingTheSearchedTags = await this.tagsRepository.findByTags(
      sanitizeSearchTags
    );

    const ids: string[] = [];

    if (!videosContainingTheSearchedTags) {
      return [];
    }

    videosContainingTheSearchedTags.forEach((tag) => {
      ids.push(tag.video_id);
    });

    const videos = await this.videosRepository.findByIds(ids);

    return videos;
  }
}

export default FindVideoService;
