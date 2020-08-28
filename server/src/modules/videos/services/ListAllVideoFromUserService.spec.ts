import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeVideosRepository from '../repositories/fakes/FakeVideosRepository';
import ListAllVideosFromUserService from './ListAllVideoFromUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeVideosRepository: FakeVideosRepository;
let listAllVideosFromUserService: ListAllVideosFromUserService;

describe('ListUserVideos', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeVideosRepository = new FakeVideosRepository();

    listAllVideosFromUserService = new ListAllVideosFromUserService(fakeVideosRepository,fakeUsersRepository);
  });

  it('should be able to list the videos of a user in specific', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
        name: 'John Tre',
        email: 'johndte@example.com',
        password: '123456',
      });

    const video = await fakeVideosRepository.create(user2);
    const video1 = await fakeVideosRepository.create(user);
    const video2 = await fakeVideosRepository.create(user2);

    const result = await listAllVideosFromUserService.execute(user2.id);

    expect(result).toStrictEqual([video, video2]);
  });

  it('Should not be able to list the videos of a inexistent user', async() => {
    await expect(listAllVideosFromUserService.execute('non-existing-user-id')).rejects.toBeInstanceOf(AppError);
  })

});
