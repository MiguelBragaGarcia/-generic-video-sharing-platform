import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';


import ListAllVideosFromUserService from '@modules/videos/services/ListAllVideoFromUserService';

class ListUserVideosController {

  public async show(request: Request, response: Response): Promise<Response> {
        const {user_id} = request.params;
        const listAllVideosFromUser = container.resolve(ListAllVideosFromUserService);

        const videos = await listAllVideosFromUser.execute(user_id);

        return response.json(classToClass(videos));
  }
}

export default ListUserVideosController;
