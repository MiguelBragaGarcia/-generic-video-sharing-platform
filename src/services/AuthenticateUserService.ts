import { sign } from 'jsonwebtoken';
import User from '../models/User';
import UserRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';
import BcryptHashProvider from '../Providers/HashProvider/implementations/BCryptHashProvider';
import authConfig from '../config/auth';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = new UserRepository();
    const hashProvider = new BcryptHashProvider();

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { expiresIn, secret } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
