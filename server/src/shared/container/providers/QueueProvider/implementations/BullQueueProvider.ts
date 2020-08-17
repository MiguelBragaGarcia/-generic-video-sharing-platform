import Queue, { Queue as BullClient } from 'bull';
import { container } from 'tsyringe';

import SendForgotPasswordEmail from '@modules/users/jobs/SendForgotPasswordEmail';
import CreateVideoTag from '@modules/videos/jobs/CreateVideoTag';

import queueConfig from '@config/queue';

import IQueueProvider from '../models/IQueueProvider';
import IQueueJobDTO from '../dtos/IQueueJobDTO';

const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmail);

const createVideoTag = new CreateVideoTag();

const jobs = [sendForgotPasswordEmail, createVideoTag];

interface IQueue {
  [key: string]: {
    client: BullClient;
    executeJob(job: any): Promise<void>;
  };
}

export default class BullQueueProvider implements IQueueProvider {
  private queues = {} as IQueue;

  constructor() {
    this.init();
  }

  init(): void {
    jobs.forEach(({ key, executeJob }) => {
      this.queues[key] = {
        client: new Queue(key, queueConfig),
        executeJob,
      };
    });
  }

  public async addJob({ key, job }: IQueueJobDTO): Promise<void> {
    await this.queues[key].client.add(job);
  }

  public processQueue(): void {
    jobs.forEach((job) => {
      this.queues[job.key].client.process((queueJob: any) => {
        const { data } = queueJob;
        job.executeJob(data);
      });
    });
  }
}
