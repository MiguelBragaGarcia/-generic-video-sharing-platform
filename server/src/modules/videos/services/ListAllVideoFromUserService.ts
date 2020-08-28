import Video from "../infra/typeorm/entities/Video";
import { injectable, inject } from "tsyringe";
import IVideosRepository from "../repositories/IVideosRepository";
import AppError from "@shared/errors/AppError";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

@injectable()
class ListAllVideosFromUserService {
    constructor(
        @inject('VideosRepository')
        private videosRepository: IVideosRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository

    ){}


    public async execute (user_id:string):Promise<Video[] | undefined> {

        const user = await this.usersRepository.findById(user_id);

        if(!user) {
            throw new AppError('User not found');
        }

        const videos = await this.videosRepository.findAllByUser(user_id);


        return videos;

    }


}

export default ListAllVideosFromUserService;