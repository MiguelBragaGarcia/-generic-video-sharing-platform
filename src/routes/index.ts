import { Router } from 'express';

import videoRouter from './video.routes';
import userRouter from './user.routes';
import sessionRouter from './session.routes';
import profileRouter from './profile.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/profile', profileRouter);

routes.use('/videos', videoRouter);
export default routes;
