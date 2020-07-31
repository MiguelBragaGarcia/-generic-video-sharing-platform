import Bee from 'bee-queue';
import { container } from 'tsyringe';
import SendForgotPasswordEmail from '@modules/users/jobs/SendForgotPasswordEmail';

import IQueueProvider from '../models/IQueueProvider';

import IJobsDTO from '../dtos/IJobsDTO';
import IAddJobDTO from '../dtos/IAddJobDTO';
import IFailJobDTO from '../dtos/IFailJobDTO';
import IQueueDTO from '../dtos/IQueueDTO';

const sendForgotPasswordEmail = container.resolve(SendForgotPasswordEmail);

const jobs = [sendForgotPasswordEmail];

class BeeQueueProvider implements IQueueProvider {
  private queues: IQueueDTO;

  constructor() {
    this.queues = {} as IQueueDTO;
    this.init();
  }

  init(): void {
    jobs.forEach(({ key, handle }: IJobsDTO) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: {
            host: '127.0.0.1',
            port: 6379,
          },
        }),
        handle,
      };
    });
  }

  public async add({ queue, job }: IAddJobDTO): Promise<void> {
    await this.queues[queue].bee.createJob(job).save();
    console.log('Adicionou a fila');
  }

  public async processQueue(): Promise<void> {
    jobs.forEach((job) => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure()).process(handle);
    });
  }

  handleFailure({ job, err }: IFailJobDTO): void {
    console.log(`Queue:  ${job.queue.name} :Failed`, err);
  }
}

export default BeeQueueProvider;
