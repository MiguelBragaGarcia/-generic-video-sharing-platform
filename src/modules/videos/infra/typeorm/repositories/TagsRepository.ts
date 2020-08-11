import { getMongoRepository, MongoRepository } from 'typeorm';

import ITagsRepository from '@modules/videos/repositories/ITagsRepository';
import ICreateIndexTagDTO from '@modules/videos/dtos/ICreateIndexTagDTO';
import Tag from '../schemas/Tag';

class TagsRepository implements ITagsRepository {
  private ormRepository: MongoRepository<Tag>;

  constructor() {
    this.ormRepository = getMongoRepository(Tag, 'mongo');
  }

  public async create({ tags, video_id }: ICreateIndexTagDTO): Promise<void> {
    const indexTags = this.ormRepository.create({ video_id, tags });

    await this.ormRepository.save(indexTags);
  }

  public async findByTags(data: string[]): Promise<Tag[] | undefined> {
    const tags = await this.ormRepository.find({
      where: {
        tags: { $in: data },
      },
    });

    return tags;
  }
}

export default TagsRepository;
