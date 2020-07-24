import BCryptHashProvider from '@shared/providers/HashProvider/implementations/BCryptHashProvider';
import AppError from '@shared/errors/AppError';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

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
