import { Router } from 'express';

import videoRouter from './video.routes';
import userRouter from './user.routes';

const routes = Router();

routes.use('/videos', videoRouter);
routes.use('/user', userRouter);

export default routes;
