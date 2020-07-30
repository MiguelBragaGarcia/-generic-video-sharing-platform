import { Job } from 'bee-queue';

export default interface IFailJobDTO {
  job: Job;
  err: string;
}
