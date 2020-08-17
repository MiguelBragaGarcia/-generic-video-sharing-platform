import { ObjectID } from 'mongodb';

import ITagsRepository from '@modules/videos/repositories/ITagsRepository';
import ICreateIndexTagDTO from '@modules/videos/dtos/ICreateIndexTagDTO';
import Tag from '@modules/videos/infra/typeorm/schemas/Tag';

class FakeTagsRepository implements ITagsRepository {
  private tagsRepository: Tag[] = [];

  public async create({ tags, video_id }: ICreateIndexTagDTO): Promise<void> {
    const tag = new Tag();

    Object.assign(tag, { id: new ObjectID(), tags, video_id });

    this.tagsRepository.push(tag);
  }

  public async findByTags(tags: string[]): Promise<Tag[] | undefined> {
    const videosWithTags = this.tagsRepository.filter((tag) => {
      const match = tags.find((word) => {
        const matchWordInTag = tag.tags.find((wordInTag) => wordInTag === word);

        if (matchWordInTag) {
          return true;
        }
        return false;
      });

      if (match) {
        return true;
      }

      return false;
    });

    return videosWithTags;
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

export default FakeTagsRepository;
