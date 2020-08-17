import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UploadVideoService from '@modules/videos/services/UploadVideoService';

class UploadVideoController {
  public async update(request: Request, response: Response): Promise<Response> {
    const uploadVideoService = container.resolve(UploadVideoService);

    const { video_id } = request.body;
    const user_id = request.user.id;

    const video = await uploadVideoService.execute({
      user_id,
      video_id,
      video_filename: request.file.filename,
    });

    return response.json(classToClass(video));
  }
}
export default UploadVideoController;
