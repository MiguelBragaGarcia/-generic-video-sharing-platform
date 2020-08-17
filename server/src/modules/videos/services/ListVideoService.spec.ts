import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeVideosRepository from '../repositories/fakes/FakeVideosRepository';
import ListVideoService from './ListVideoService';

let fakeUsersRepository: FakeUsersRepository;
let fakeVideosRepository: FakeVideosRepository;
let listVideoService: ListVideoService;

describe('ListVideos', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVideosRepository = new FakeVideosRepository();

    listVideoService = new ListVideoService(fakeVideosRepository);
  });

  it('should show a list of registered videos', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);
    const video1 = await fakeVideosRepository.create(user);
    const video2 = await fakeVideosRepository.create(user);

    const result = await listVideoService.execute({ page: '1' });

    expect(result).toStrictEqual([video, video1, video2]);
  });

  it('should show a empty list of registered videos', async () => {
    const result = await listVideoService.execute({ page: '1' });

    expect(result).toStrictEqual([]);
  });
});
