import IJobs from '@modules/users/jobs/models/IJobs';
import { container } from 'tsyringe';
import CreateVideoTagService from '../services/CreateVideoTagService';
import Video from '../infra/typeorm/entities/Video';

class CreateVideoTags implements IJobs {
  get key(): string {
    return 'CreateVideoTags';
  }

  public async executeJob(video: Video): Promise<void> {
    const createVideoTagService = container.resolve(CreateVideoTagService);

    createVideoTagService.execute(video);
  }
}

export default CreateVideoTags;
