import ISearchTagDTO from '../dtos/ICreateSearchTagDTO';
import SearchTag from '../infra/typeorm/schemas/SearchTag';

export default interface ISearchTagsRepository {
  create(data: ISearchTagDTO): Promise<void>;
  findByKey(key: string): Promise<SearchTag | undefined>;
  save(index: SearchTag): Promise<SearchTag>;
}
