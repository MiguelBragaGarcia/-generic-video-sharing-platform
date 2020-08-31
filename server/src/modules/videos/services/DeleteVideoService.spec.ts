import AppError from '@shared/errors/AppError';
import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeDiskStorageProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeVideosRepository from '../repositories/fakes/FakeVideosRepository';
import DeleteVideoService from './DeleteVideoService';
import FakeTagsRepository from '../repositories/fakes/FakeTagsRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeVideosRepository: FakeVideosRepository;
let fakeTagsReposiory: FakeTagsRepository;

let fakeVideoStorageProvider: FakeDiskStorageProvider;
let fakeThumbnailStorageProvider: FakeDiskStorageProvider;
let deleteVideoService: DeleteVideoService;

describe('DeleteVideo', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVideosRepository = new FakeVideosRepository();
    fakeTagsReposiory= new FakeTagsRepository();
    fakeVideoStorageProvider = new FakeDiskStorageProvider();
    fakeThumbnailStorageProvider = new FakeDiskStorageProvider();
    deleteVideoService = new DeleteVideoService(
      fakeVideoStorageProvider,
      fakeThumbnailStorageProvider,
      fakeTagsReposiory,
      fakeVideosRepository
    );
  });

  it('Should be able delete a video', async () => {
    const deleteVideoInDatabase = jest.spyOn(fakeVideosRepository, 'delete');
    const deleteVideo = jest.spyOn(fakeVideoStorageProvider, 'deleteFile');
    const deleteThumbnail = jest.spyOn(fakeThumbnailStorageProvider, 'deleteFile');
    const deleteTagInDatabase = jest.spyOn(fakeTagsReposiory,'delete')

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const video = await fakeVideosRepository.create(user);

    video.video = 'video.mp4';
    video.thumbnail="thumbnail.jpg"

    const updatedVideo = await fakeVideosRepository.save(video);

    await deleteVideoService.execute({
      user_id: user.id,
      video_id: video.id,
    });

    expect(deleteVideoInDatabase).toBeCalledWith(video.id);
    expect(deleteTagInDatabase).toBeCalledWith(video.id);

    expect(deleteVideo).toBeCalledWith('video.mp4');
    expect(deleteThumbnail).toBeCalledWith('thumbnail.jpg');

  
  });

  it('Should be able delete a raw video instance', async () => {
    const deleteInDatabase = jest.spyOn(fakeVideosRepository, 'delete');
    const deleteFile = jest.spyOn(fakeVideoStorageProvider, 'deleteFile');

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
