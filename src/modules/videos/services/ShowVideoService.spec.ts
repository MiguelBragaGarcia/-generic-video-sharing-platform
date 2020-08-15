import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeVideosRepository from '../repositories/fakes/FakeVideosRepository';
import ShowVideoService from './ShowVideoService';

let fakeUsersRepository: FakeUsersRepository;
let fakeVideosRepository: FakeVideosRepository;
let showVideoService: ShowVideoService;
describe('ShowVideo', () => {
  beforeEach(() => {
    fakeVideosRepository = new FakeVideosRepository();
    fakeUsersRepository = new FakeUsersRepository();
    showVideoService = new ShowVideoService(fakeVideosRepository);
  });

  it('Should be able show a specific video', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });
    const video = await fakeVideosRepository.create(user);

    video.title = 'Test';
    video.description = 'A simple text';

    await fakeVideosRepository.save(video);

    const findVideo = await showVideoService.execute({ video_id: video.id });

    expect(findVideo.title).toBe('Test');
    expect(findVideo.description).toBe('A simple text');
  });

  it('Should not be able show a specific video if it does not exists', async () => {
    await expect(
      showVideoService.execute({ video_id: 'non-existing-video-id' })
    ).rejects.toBeInstanceOf(AppError);
  });
});
