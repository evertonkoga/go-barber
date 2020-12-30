import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const appointmentsRoutes = Router();
const providersController = new ProvidersController();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.get('/', providersController.index);

export default appointmentsRoutes;
