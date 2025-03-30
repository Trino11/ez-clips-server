import { Router } from 'express';

import { getInfo } from '../../controllers/info/infoController';

const infoRoutes = Router();

infoRoutes.get('/', getInfo);

export default infoRoutes;
