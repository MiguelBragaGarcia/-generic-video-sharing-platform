import ICreateIndexTagDTO from '../dtos/ICreateIndexTagDTO';
import Tag from '../infra/typeorm/schemas/Tag';

export default interface ITagsRepository {
  create(data: ICreateIndexTagDTO): Promise<void>;
  findByTags(data: string[]): Promise<Tag[] | undefined>;
}
