import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeVideosRepository from '../repositories/fakes/FakeVideosRepository';
import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';
import FindVideoService from './FindVideoService';

let fakeUsersRepository: FakeUsersRepository;
let fakeVideosRepository: FakeVideosRepository;
let fakeTagsRepository: FakeTagsRepository;
let findVideoService: FindVideoService;

describe('FindVideo', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    fakeUsersRepository = new FakeUsersRepository();
    fakeVideosRepository = new FakeVideosRepository();
    fakeTagsRepository = new FakeTagsRepository();

    findVideoService = new FindVideoService(
      fakeVideosRepository,
      fakeTagsRepository
    );
  });

  it('Sould be able to find a video by tags', async () => {
    const findByIds = jest.spyOn(fakeVideosRepository, 'findByIds');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);
    const video1 = await fakeVideosRepository.create(user);
    const video2 = await fakeVideosRepository.create(user);

    video.title = 'test example';
    video.description = 'this is a simple text';

    video1.title = 'Video upload';
    video1.description = 'simple text example for upload';

    video2.title = 'Artificial Intelligence';
    video2.description = 'simple text to AI process';

    await fakeVideosRepository.save(video);
    await fakeTagsRepository.create({
      tags: ['test', 'example', 'this', 'is', 'a', 'simple', 'text'],
      video_id: video.id,
    });
    await fakeVideosRepository.save(video1);
    await fakeTagsRepository.create({
      tags: ['Video', 'upload', 'simple', 'text', 'example', 'for', 'upload'],
      video_id: video1.id,
    });

    await fakeVideosRepository.save(video2);
    await fakeTagsRepository.create({
      tags: [
        'Atificial',
        'Intelligence',
        'simple',
        'text',
        'to',
        'AI',
        'process',
      ],
      video_id: video2.id,
    });

    const findVideos = await findVideoService.execute('example');

    expect(findByIds).toBeCalledWith([video.id, video1.id]);
    expect(findVideos).toStrictEqual([video, video1]);
  });

  it('Should get a empty list of videos', async () => {
    const listVideos = await findVideoService.execute('example');

    console.log(listVideos);

    expect(listVideos).toStrictEqual([]);
  });
});
