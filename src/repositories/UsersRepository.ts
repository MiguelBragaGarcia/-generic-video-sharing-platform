import { getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '../DTOS/ICreateUserDTO';

import User from '../models/User';

class UsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const newUser = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(newUser);

    return newUser;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }
}
export default UsersRepository;
