import IQueueProvider from '../models/IQueueProvider';
import IQueueJobDTO from '../dtos/IQueueJobDTO';

export default class BullQueueProvider implements IQueueProvider {
  private queues: IQueueJobDTO[] = [];

  public async addJob(data: IQueueJobDTO): Promise<void> {
    this.queues.push(data);
  }

  public processQueue(): void {
    this.queues = [];
  }
}
