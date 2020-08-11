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

  public async execute(
    searchTags: string
  ): Promise<(Video | undefined)[] | string> {
    const sanitizeSearchTags = sanitizeString(searchTags);

    const videosContainingTheSearchedTags = await this.tagsRepository.findByTags(
      sanitizeSearchTags
    );

    if (!videosContainingTheSearchedTags) {
      return 'No videos were found';
    }

    // Faz a busca no banco SQL e retorna os vídeos.
    const getVideos = async () => {
      return Promise.all(
        videosContainingTheSearchedTags.map((tag) => {
          return this.videosRepository.findById(tag.video_id);
        })
      );
    };

    const videos = getVideos();

    return videos;
  }
}

export default FindVideoService;
