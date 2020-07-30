import IAddJob from '../dtos/IAddJobDTO';

export default interface IQueueProvider {
  add(data: IAddJob): Promise<void>;
  processQueue(): Promise<void>;
}
