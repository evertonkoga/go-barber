import { Router } from 'express';

import AuthenticateUserSevice from '../services/AuthenticateUserSevice';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const { user, token } = await new AuthenticateUserSevice().execute({ email, password });

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.status(201).json({ user: userWithoutPassword, token });
});

export default sessionsRouter;
