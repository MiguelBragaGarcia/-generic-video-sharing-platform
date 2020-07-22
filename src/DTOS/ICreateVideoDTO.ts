import User from '../models/User';

export default interface ICreateVideoDTO {
  user: User;

  title: string;
  description: string;
}
