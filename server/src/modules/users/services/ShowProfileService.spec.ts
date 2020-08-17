import AppError from '@shared/errors/AppError';
import FakeUsersRespository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRespository;
let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRespository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it('Should be able to show profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('John Doe');
    expect(profile.email).toBe('johndoe@example.com');
  });

  it('Should not be able to show profile from non existing user', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-existing-user-id' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
