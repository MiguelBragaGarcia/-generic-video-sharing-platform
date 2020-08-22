import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UploadThumbnailVideoService from '@modules/videos/services/UploadThumbnailService';
import { classToClass } from 'class-transformer';

class UploadThumbnailController {
  public async update(request: Request, response: Response): Promise<Response> {
    const uploadVideoService = container.resolve(UploadThumbnailVideoService);

    const { video_id } = request.body;
    const user_id = request.user.id;

    const video = await uploadVideoService.execute({
      user_id,
      video_id,
      thumbnail_filename: request.file.filename,
    });

    return response.json(classToClass(video));
  }
}

export default UploadThumbnailController;
