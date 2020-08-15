import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeTagRepository from '../repositories/fakes/FakeTagsRepository';
import FakeVideosRepository from '../repositories/fakes/FakeVideosRepository';
import CreateVideoTagService from './CreateVideoTagService';

let fakeTagRepository: FakeTagRepository;
let fakeVideosRepository: FakeVideosRepository;
let fakeUsersRepository: FakeUsersRepository;
let createVideoTagService: CreateVideoTagService;

describe('CreateVideo', () => {
  beforeEach(() => {
    fakeTagRepository = new FakeTagRepository();
    fakeVideosRepository = new FakeVideosRepository();
    fakeUsersRepository = new FakeUsersRepository();

    createVideoTagService = new CreateVideoTagService(fakeTagRepository);
  });

  it('Should be able to create a video tag', async () => {
    const create = jest.spyOn(fakeTagRepository, 'create');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);

    video.title = 'Simple test';
    video.description = 'A simple text to a simple test';

    await fakeVideosRepository.save(video);

    await createVideoTagService.execute(video);

    expect(create).toBeCalledWith({
      video_id: video.id,
      tags: ['Simple', 'test', 'A', 'simple', 'text', 'to', 'a'],
    });
  });
});
