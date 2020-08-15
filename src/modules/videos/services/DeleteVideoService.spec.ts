import AppError from '@shared/errors/AppError';
import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeVideosRepository from '../repositories/fakes/FakeVideosRepository';
import DeleteVideoService from './DeleteVideoService';

let fakeUsersRepository: FakeUsersRepository;
let fakeVideosRepository: FakeVideosRepository;
let fakeDiskStorageProvider: FakeDiskStorageProvider;
let deleteVideoService: DeleteVideoService;

describe('DeleteVideo', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVideosRepository = new FakeVideosRepository();
    fakeDiskStorageProvider = new FakeDiskStorageProvider();
    deleteVideoService = new DeleteVideoService(
      fakeDiskStorageProvider,
      fakeVideosRepository
    );
  });

  it('Should be able delete a video', async () => {
    const deleteInDatabase = jest.spyOn(fakeVideosRepository, 'delete');
    const deleteFile = jest.spyOn(fakeDiskStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);

    video.video = 'video.mp4';

    const updatedVideo = await fakeVideosRepository.save(video);

    await deleteVideoService.execute({
      user_id: user.id,
      video_id: video.id,
    });

    expect(deleteInDatabase).toBeCalledWith(video.id);
    expect(deleteFile).toBeCalledWith('video.mp4');
  });

  it('Should be able delete a raw video instance', async () => {
    const deleteInDatabase = jest.spyOn(fakeVideosRepository, 'delete');
    const deleteFile = jest.spyOn(fakeDiskStorageProvider, 'deleteFile');

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);

    await deleteVideoService.execute({
      user_id: user.id,
      video_id: video.id,
    });

    expect(deleteInDatabase).toBeCalledWith(video.id);
    expect(deleteFile).not.toBeCalledWith('');
  });

  it('Should not be able delete a video if it does not exists', async () => {
    await expect(
      deleteVideoService.execute({
        user_id: 'non-existing-user-id',
        video_id: 'non-existing-user-id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be possible to delete another user's video", async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);

    await expect(
      deleteVideoService.execute({
        user_id: 'another-user-id',
        video_id: video.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
