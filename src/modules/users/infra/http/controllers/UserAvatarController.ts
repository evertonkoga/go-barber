import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarContoller {
  public async update(request: Request, response: Response): Promise<Response> {
    const user = await container.resolve(UpdateUserAvatarService).execute(
      {
        user_id: request.user.id,
        avatarFilename: request.file.filename,
      },
    );

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return response.json({ user: userWithoutPassword });
  }
}
