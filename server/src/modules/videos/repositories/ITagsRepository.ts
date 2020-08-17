import ICreateIndexTagDTO from '../dtos/ICreateIndexTagDTO';
import Tag from '../infra/typeorm/schemas/Tag';

export default interface ITagsRepository {
  create(data: ICreateIndexTagDTO): Promise<void>;
  findByTags(tags: string[]): Promise<Tag[] | undefined>;
  save(data: Tag): Promise<void>;
  findByVideoId(video_id: string): Promise<Tag | undefined>;
}
