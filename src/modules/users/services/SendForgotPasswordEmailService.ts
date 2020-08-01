import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';
import IQueueProvider from '@shared/container/providers/QueueProvider/models/IQueueProvider';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRespository: IUserTokenRepository,

    @inject('QueueProvider')
    private queueProvider: IQueueProvider
  ) {}

  get key(): string {
    return 'ForgotPasswordEmail';
  }

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

    await this.queueProvider.addJob({
      key: 'ForgotPasswordEmail',
      job: emailData,
    });
  }
}

export default SendForgotPasswordEmailService;
