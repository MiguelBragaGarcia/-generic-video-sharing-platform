import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateVideoService from '@modules/videos/services/CreateVideoService';
import DeleteVideoService from '@modules/videos/services/DeleteVideoService';
import UpdateVideoService from '@modules/videos/services/UpdateVideoService';

class VideosController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createVideoService = container.resolve(CreateVideoService);

    const user_id = request.user.id;

    const video = await createVideoService.execute({
      user_id,
    });

    return response.json(classToClass(video));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateVideoService = container.resolve(UpdateVideoService);

    const { title, description, video_id } = request.body;
    const user_id = request.user.id;

    const video = await updateVideoService.execute({
      video_id,
      user_id,
      title,
      description,
    });

    return response.json(classToClass(video));
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteVideoService = container.resolve(DeleteVideoService);

    const user_id = request.user.id;
    const { video_id } = request.body;

    await deleteVideoService.execute({ user_id, video_id });

    return response.status(204).json();
  }
}

export default VideosController;
