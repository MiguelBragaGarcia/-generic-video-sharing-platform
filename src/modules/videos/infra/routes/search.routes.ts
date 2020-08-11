import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';
import SearchController from '../controllers/SearchController';

const searchRouter = Router();
const searchController = new SearchController();

searchRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      searchTags: Joi.string().required(),
    },
  }),
  searchController.show
);

export default searchRouter;
