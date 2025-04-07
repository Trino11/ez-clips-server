import { Router } from 'express';
import infoController from '../info/infoController';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Hello World');
});

routes.use('/info', infoController);

export default routes;
