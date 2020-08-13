import { inject, injectable } from 'tsyringe';
import Video from '../infra/typeorm/entities/Video';
import sanitizeString from '../utils/sanitizeString';
import ITagsRepository from '../repositories/ITagsRepository';

@injectable()
class CreateVideoTagService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  public async execute({ id, title, description }: Video): Promise<void> {
    const titleWords = sanitizeString(title);
    const descriptionWords = sanitizeString(description);

    const tags = [...titleWords, ...descriptionWords];

    const tagsWithoutDuplicates = tags.filter((tag, index, tagsArray) => {
      return tagsArray.indexOf(tag) === index;
    });

    const hasTagsInDatabase = await this.tagsRepository.findByVideoId(id);

    if (!hasTagsInDatabase) {
      await this.tagsRepository.create({
        video_id: id,
        tags: tagsWithoutDuplicates,
      });
    } else {
      hasTagsInDatabase.tags = tagsWithoutDuplicates;

      await this.tagsRepository.save(hasTagsInDatabase);
    }
  }
}

export default CreateVideoTagService;
