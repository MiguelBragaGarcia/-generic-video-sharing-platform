import { injectable, inject } from 'tsyringe';

import IJobsDTO from '@shared/container/providers/QueueProvider/dtos/IJobsDTO';
import ISendEmailDTO from '@shared/container/providers/MailProvider/dtos/ISendEmailDTO';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

@injectable()
class SendForgotPasswordEmail implements IJobsDTO {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  get key(): string {
    return 'SendForgotPasswordEmail';
  }

  async handle(data: ISendEmailDTO): Promise<void> {
    await this.mailProvider.sendMail(data);
  }
}

export default SendForgotPasswordEmail;
