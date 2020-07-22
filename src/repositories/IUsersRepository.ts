import User from '../models/User';
import ICreateUserDTO from '../DTOS/ICreateUserDTO';

export default interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
}
