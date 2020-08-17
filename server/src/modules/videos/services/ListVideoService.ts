import { injectable, inject } from 'tsyringe';
import Video from '../infra/typeorm/entities/Video';
import IVideosRepository from '../repositories/IVideosRepository';

interface IRequest {
  page: string;
}

@injectable()
class ListVideoService {
  constructor(
    @inject('VideosRepository')
    private videosRepository: IVideosRepository
  ) {}

  public async execute({ page }: IRequest): Promise<Video[] | undefined> {
    const itensPerPage = 10;
    const skip = Number(page) * itensPerPage - itensPerPage;

    const videos = await this.videosRepository.find({
      skip,
      take: itensPerPage,
    });

    return videos;
  }
}
export default ListVideoService;
