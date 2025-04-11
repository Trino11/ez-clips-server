import { Router } from 'express';
import authController from '../auth/authController';
import infoController from '../info/infoController';
import videoController from '../video/videoController';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Hello World');
});

routes.use('/auth', authController);
routes.use('/info', infoController);
routes.use('/video', videoController);

export default routes;
