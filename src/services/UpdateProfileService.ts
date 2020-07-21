import UsersRepository from '../repositories/UsersRepository';
import BCryptHashProvider from '../Providers/HashProvider/implementations/BCryptHashProvider';

import AppError from '../errors/AppError';
import User from '../models/User';

interface IRequest {
  id: string;
  name: string;
  email: string;
  old_password?: string;
  password: string;
}

class UpdateProfileService {
  public async execute({
    id,
    name,
    email,
    old_password,
    password,
  }: IRequest): Promise<User> {
    const usersRepository = new UsersRepository();
    const hashProvider = new BCryptHashProvider();

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const userWithUpdatedEmail = await usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Email already in use');
    }

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password'
      );
    }

    if (password && old_password) {
      const checkOldPassword = await hashProvider.compareHash(
        old_password,
        user.password
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }
    }

    if (password) {
      user.password = await hashProvider.generateHash(password);
    }

    user.name = name;
    user.email = email;

    const updatedUser = await usersRepository.save(user);

    return updatedUser;
  }
}

export default UpdateProfileService;
