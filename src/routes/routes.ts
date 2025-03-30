import { Router } from 'express';
import infoRoutes from './info/infoRoutes';

const routes = Router();

routes.get('/', (req, res) => {
  res.send('Hello World');
});

routes.use('/info', infoRoutes);

export default routes;
