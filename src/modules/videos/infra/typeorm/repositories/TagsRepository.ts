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
    const newTag = this.ormRepository.create({ video_id, tags });

    await this.ormRepository.save(newTag);
  }

  public async findByTags(tags: string[]): Promise<Tag[] | undefined> {
    const videosContainingTheTags = await this.ormRepository.find({
      where: {
        tags: { $in: tags },
      },
    });

    return videosContainingTheTags;
  }
}

export default TagsRepository;
