import {Router} from 'express';

import videoRouter from '../routes/video.routes';

const routes = Router ();

routes.use('/videos', videoRouter);

export default routes;