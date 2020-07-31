import { getMongoRepository, MongoRepository } from 'typeorm';
import ISearchTagsRepository from '@modules/videos/repositories/ISearchTagRepository';
import ICreateSearchTagDTO from '@modules/videos/dtos/ICreateSearchTagDTO';
import SearchTag from '../schemas/SearchTag';

class SearchTagsRepository implements ISearchTagsRepository {
  private ormRepository: MongoRepository<SearchTag>;

  constructor() {
    this.ormRepository = getMongoRepository(SearchTag, 'mongo');
  }

  public async create({ tag, video_ids }: ICreateSearchTagDTO): Promise<void> {
    const index = this.ormRepository.create({
      key: tag,
      video_ids,
    });

    await this.ormRepository.save(index);
  }

  public async findByKey(key: string): Promise<SearchTag | undefined> {
    const index = this.ormRepository.findOne({ where: key });

    return index;
  }

  public async save(index: SearchTag): Promise<SearchTag> {
    return this.ormRepository.save(index);
  }
}

export default SearchTagsRepository;
