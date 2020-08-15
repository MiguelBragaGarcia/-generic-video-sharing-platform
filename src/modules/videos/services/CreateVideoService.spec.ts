import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeVideosRepository from '../repositories/fakes/FakeVideosRepository';
import CreateVideoService from './CreateVideoService';

let fakeUsersRepository: FakeUsersRepository;
let fakeVideosRepository: FakeVideosRepository;

let createVideoService: CreateVideoService;

describe('CreateVideo', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVideosRepository = new FakeVideosRepository();

    createVideoService = new CreateVideoService(
      fakeVideosRepository,
      fakeUsersRepository
    );
  });

  it('Should be able create a video', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await createVideoService.execute({ user_id: user.id });

    expect(video.title).toBe('');
    expect(video.description).toBe('');
    expect(video.views).toBe(0);
    expect(video.user).toBe(user);
  });

  it('Should not be able create a video with a non existing user', async () => {
    await expect(
      createVideoService.execute({ user_id: 'non-existing-user-id' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
