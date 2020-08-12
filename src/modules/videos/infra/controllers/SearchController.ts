import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindVideoService from '@modules/videos/services/FindVideoService';
import { classToClass } from 'class-transformer';

class SearchController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { searchTags } = request.body;
    const findVideoService = container.resolve(FindVideoService);

    const videos = await findVideoService.execute(searchTags);

    return response.json(classToClass(videos));
  }
}

export default SearchController;
