import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import FakeVideosRepository from '../repositories/fakes/FakeVideosRepository';
import UploadVideoService from './UploadVideoService';

let fakeVideosRepository: FakeVideosRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeDiskStorageProvider: FakeDiskStorageProvider;

let uploadVideoService: UploadVideoService;

describe('UploadVideo', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVideosRepository = new FakeVideosRepository();
    fakeDiskStorageProvider = new FakeDiskStorageProvider();

    uploadVideoService = new UploadVideoService(
      fakeVideosRepository,
      fakeDiskStorageProvider
    );
  });

  it('Should be able upload a video', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);

    const updatedVideo = await uploadVideoService.execute({
      video_id: video.id,
      user_id: user.id,
      video_filename: 'video.mp4',
    });

    expect(updatedVideo.video).toBe('video.mp4');
  });

  it('Should not be able upload a video if it does not exists a instance', async () => {
    await expect(
      uploadVideoService.execute({
        user_id: 'non-existing-user-id',
        video_id: 'non-existing-user-id',
        video_filename: 'video.mp4',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able upload another user's video", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);

    await expect(
      uploadVideoService.execute({
        user_id: 'another-user-id',
        video_id: video.id,
        video_filename: 'video.mp4',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
