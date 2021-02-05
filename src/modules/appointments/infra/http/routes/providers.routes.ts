import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const appointmentsRoutes = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

appointmentsRoutes.use(ensureAuthenticated);

appointmentsRoutes.get('/', providersController.index);
appointmentsRoutes.get('/:provider_id/month-availability', providerMonthAvailabilityController.index);
appointmentsRoutes.get('/:provider_id/day-availability', providerDayAvailabilityController.index);

export default appointmentsRoutes;
