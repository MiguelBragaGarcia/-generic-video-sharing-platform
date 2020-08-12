import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateVideoService from '@modules/videos/services/CreateVideoService';
import DeleteVideoService from '@modules/videos/services/DeleteVideoService';
import UpdateVideoService from '@modules/videos/services/UpdateVideoService';
import ListVideoService from '@modules/videos/services/ListVideoService';
import ShowVideoService from '@modules/videos/services/ShowVideoService';

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

  public async index(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;

    const listVideoService = container.resolve(ListVideoService);

    const videos = await listVideoService.execute({ page: String(page) });

    return response.json(classToClass(videos));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { video_id } = request.params;

    const showVideoService = container.resolve(ShowVideoService);

    const video = await showVideoService.execute({ video_id });

    return response.json(classToClass(video));
  }
}

export default VideosController;
