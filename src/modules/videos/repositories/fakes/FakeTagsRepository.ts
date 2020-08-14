import { ObjectID } from 'mongodb';

import ITagsRepository from '@modules/videos/repositories/ITagsRepository';
import ICreateIndexTagDTO from '@modules/videos/dtos/ICreateIndexTagDTO';
import Tag from '@modules/videos/infra/typeorm/schemas/Tag';

class TagsRepository implements ITagsRepository {
  private tagsRepository: Tag[] = [];

  public async create({ tags, video_id }: ICreateIndexTagDTO): Promise<void> {
    const tag = new Tag();

    Object.assign(tag, { id: new ObjectID(), tags, video_id });

    this.tagsRepository.push(tag);
  }

  public async findByTags(tags: string[]): Promise<Tag[] | undefined> {
    // Tem que fazer esse método ainda.
  }

  public async save(tag: Tag): Promise<void> {
    const findIndex = this.tagsRepository.findIndex(
      (savedTags) => savedTags.id === tag.id
    );

    this.tagsRepository[findIndex] = tag;
  }

  public async findByVideoId(video_id: string): Promise<Tag | undefined> {
    return this.tagsRepository.find((tag) => tag.video_id === video_id);
  }
}

export default TagsRepository;
