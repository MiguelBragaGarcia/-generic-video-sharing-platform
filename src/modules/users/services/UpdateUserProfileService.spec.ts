import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';
import UpdateUserProfileService from './UpdateUserProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateUserProfileService: UpdateUserProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeHashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateUserProfileService = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it('Should be able update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'john doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const profile = await updateUserProfileService.execute({
      id: user.id,
      name: 'John Trê',
      email: 'johntre@example.com',
    });

    expect(profile.name).toBe('John Trê');
    expect(profile.email).toBe('johntre@example.com');
  });

  it('Should not be able update the profile from non existing user', async () => {
    await expect(
      updateUserProfileService.execute({
        id: 'non-existing-user-id',
        name: 'John Trê',
        email: 'johntre@example.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to change the e-mail if it is already in use', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'John Trê',
      email: 'johntre@example.com',
      password: '123456',
    });

    await expect(
      updateUserProfileService.execute({
        id: user.id,
        name: 'John Trê',
        email: 'johndoe@example.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to change the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateUserProfileService.execute({
      id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456789',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123456789');
  });

  it('Should not be able to change the password without the old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateUserProfileService.execute({
        id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456789',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to change the password with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateUserProfileService.execute({
        id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456789',
        old_password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
