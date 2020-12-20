import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserSevice from '@modules/users/services/AuthenticateUserSevice';


export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const { user, token } = await container.resolve(AuthenticateUserSevice).execute({ email, password });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.status(201).json({ user: userWithoutPassword, token });
  }
}
