import { injectable, inject } from 'tsyringe';

import IJobsDTO from '@shared/container/providers/QueueProvider/dtos/IJobsDTO';
import ISendEmailDTO from '@shared/container/providers/MailProvider/dtos/ISendEmailDTO';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

@injectable()
class CancellationMail implements IJobsDTO {
  constructor(
    // Cannot inject the dependency at position #0 of "CancellationMail" constructor. Reason:
    // Attempted to resolve unregistered dependency token: "MailProvider"

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  get key(): string {
    return 'CancellationMail';
  }

  async handle(data: ISendEmailDTO): Promise<void> {
    await this.mailProvider.sendMail(data);
  }
}

export default CancellationMail;
