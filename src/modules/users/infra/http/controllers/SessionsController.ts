import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserSevice from '@modules/users/services/AuthenticateUserSevice';
export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const { user, token } = await container.resolve(AuthenticateUserSevice).execute({ email, password });

    console.log(user, token)

    return response.status(201).json({ user: classToClass(user), token });
  }
}
