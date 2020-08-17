import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('Should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
    });

    const loggedUser = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '1234567',
    });

    expect(loggedUser).toHaveProperty('token');
    expect(loggedUser.user).toEqual(user);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
    });

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: '12345678',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
