import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindVideoService from '@modules/videos/services/FindVideoService';

class SearchController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { searchTags } = request.body;
    const findVideoService = container.resolve(FindVideoService);

    const videos = await findVideoService.execute(searchTags);

    return response.json(videos);
  }
}

export default SearchController;
