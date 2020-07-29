import { Router } from 'express';

import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import userRouter from '@modules/users/infra/http/routes/user.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import videoRouter from '@modules/videos/infra/routes/video.routes';

const routes = Router();

routes.use('/user', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/profile', profileRouter);
routes.use('/videos', videoRouter);
routes.use('/password', passwordRouter);

export default routes;
