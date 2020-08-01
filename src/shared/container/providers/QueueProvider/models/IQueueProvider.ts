import IQueueJobDTO from '../dtos/IQueueJobDTO';

export default interface IQueueProvider {
  addJob(data: IQueueJobDTO): Promise<void>;
  processQueue(): void;
}
