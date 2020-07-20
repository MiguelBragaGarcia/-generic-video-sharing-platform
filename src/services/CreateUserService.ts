import User from '../models/User';
import BCryptHashProvider from '../Providers/HashProvider/implementations/BCryptHashProvider';

import UsersRepository from '../repositories/UsersRepository';
import AppError from '../errors/AppError';

interface IRequest {
  name: string;
  password: string;
  email: string;
}

class CreateUserService {
  public async execute({ name, password, email }: IRequest): Promise<User> {
    const userRepository = new UsersRepository();
    const bCryptHashProvider = new BCryptHashProvider();

    const userWithSameEmail = await userRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await bCryptHashProvider.generateHash(password);

    const newUser = await userRepository.create({
      name,
      password: hashedPassword,
      email,
    });

    delete newUser.password;

    return newUser;
  }
}

export default CreateUserService;
