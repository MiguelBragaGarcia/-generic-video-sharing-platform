import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import FakeVideosRepository from '../repositories/fakes/FakeVideosRepository';
import UploadThumbnailService from './UploadThumbnailService';

let fakeVideosRepository: FakeVideosRepository;
let fakeUsersRepository: FakeUsersRepository;
let fakeDiskStorageProvider: FakeDiskStorageProvider;

let uploadThumbnailService: UploadThumbnailService;

describe('UploadThumbnail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVideosRepository = new FakeVideosRepository();
    fakeDiskStorageProvider = new FakeDiskStorageProvider();

    uploadThumbnailService = new UploadThumbnailService(
      fakeVideosRepository,
      fakeDiskStorageProvider
    );
  });

  it('Should be able upload a thumbnail', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);

    const updatedVideo = await uploadThumbnailService.execute({
      video_id: video.id,
      user_id: user.id,
      thumbnail_filename: 'thumbnail.png',
    });

    expect(updatedVideo.thumbnail).toBe('thumbnail.png');
  });

  it('Should delete old thumbnail when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeDiskStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);

    await uploadThumbnailService.execute({
      video_id: video.id,
      user_id: user.id,
      thumbnail_filename: 'thumbnail.png',
    });

    const updatedVideo = await uploadThumbnailService.execute({
      video_id: video.id,
      user_id: user.id,
      thumbnail_filename: 'thumbnail2.png',
    });

    expect(updatedVideo.thumbnail).toBe('thumbnail2.png');
    expect(deleteFile).toHaveBeenCalledWith('thumbnail.png');
  });

  it('Should not be able upload a thumbnail if it does not exists a instance of video', async () => {
    await expect(
      uploadThumbnailService.execute({
        user_id: 'non-existing-user-id',
        video_id: 'non-existing-user-id',
        thumbnail_filename: 'thumbnail.png',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able upload thumbnail for another user's video", async () => {
    const deleteFailUpload = jest.spyOn(
      fakeDiskStorageProvider,
      'deleteFileFailUpload'
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);

    await expect(
      uploadThumbnailService.execute({
        user_id: 'another-user-id',
        video_id: video.id,
        thumbnail_filename: 'thumbnail.png',
      })
    ).rejects.toBeInstanceOf(AppError);

    expect(deleteFailUpload).toBeCalledWith('thumbnail.png');
  });
});
