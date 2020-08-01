import { inject, injectable } from 'tsyringe';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import ISendEmailDTO from '@shared/container/providers/MailProvider/dtos/ISendEmailDTO';
import IJobs from './models/IJobs';

@injectable()
class SendForgotPasswordEmail implements IJobs {
  constructor(
    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  get key(): string {
    return 'ForgotPasswordEmail';
  }

  public async executeJob(emailData: ISendEmailDTO): Promise<void> {
    await this.mailProvider.sendMail(emailData);
  }
}

export default SendForgotPasswordEmail;
