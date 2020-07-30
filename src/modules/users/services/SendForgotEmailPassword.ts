import { inject, injectable } from 'tsyringe';
import path from 'path';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotEmailPassword {
  constructor(
    // @inject('MailProvider')
    // private mailProvider: IMailProvider,

    @inject('QueueProvider')
    private queueProvider: IQueueProvider,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRespository: IUserTokenRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User not found');
    }

    const { token } = await this.userTokensRespository.generate(user.id);

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    );

    const emailData = {
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[NOME DA PLATAFORMA] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset-password?token=${token}`,
        },
      },
    };

    await this.queueProvider.add({ queue: 'CancellationMail', job: emailData });

    // await this.mailProvider.sendMail({
    //   to: {
    //     name: user.name,
    //     email: user.email,
    //   },
    //   subject: '[NOME DA PLATAFORMA] Recuperação de senha',
    //   templateData: {
    //     file: forgotPasswordTemplate,
    //     variables: {
    //       name: user.name,
    //       link: `http://localhost:3000/reset-password?token=${token}`,
    //     },
    //   },
    // });
  }
}

export default SendForgotEmailPassword;
