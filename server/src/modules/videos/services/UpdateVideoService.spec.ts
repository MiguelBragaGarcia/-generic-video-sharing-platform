import AppError from '@shared/errors/AppError';
import FakeQueueProvider from '@shared/container/providers/QueueProvider/fakes/FakeQueueProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeVideosRepository from '../repositories/fakes/FakeVideosRepository';
import UpdateVideoService from './UpdateVideoService';

let fakeVideosRepository: FakeVideosRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeQueueProvider: FakeQueueProvider;

let updateVideoService: UpdateVideoService;

describe('UpdateVideo', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVideosRepository = new FakeVideosRepository();
    fakeQueueProvider = new FakeQueueProvider();

    updateVideoService = new UpdateVideoService(
      fakeVideosRepository,
      fakeQueueProvider
    );
  });

  it('Should be able update a video', async () => {
    const addJob = jest.spyOn(fakeQueueProvider, 'addJob');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);

    const updatedVideo = await updateVideoService.execute({
      video_id: video.id,
      user_id: user.id,
      title: 'Test',
      description: 'A simple text',
    });

    expect(updatedVideo.title).toBe('Test');
    expect(updatedVideo.description).toBe('A simple text');
    expect(addJob).toBeCalledWith({
      job: updatedVideo,
      key: 'CreateVideoTags',
    });
  });

  it('Should not be able update a video if it does not exists', async () => {
    await expect(
      updateVideoService.execute({
        user_id: 'non-existing-user-id',
        video_id: 'non-existing-user-id',
        title: 'Test',
        description: 'A simple text',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able updade another user's video", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);

    await expect(
      updateVideoService.execute({
        user_id: 'another-user-id',
        video_id: video.id,
        title: 'Test',
        description: 'A simple text',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
