import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateUserService from '../services/CreateUserService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRoutes = Router();
const upload = multer(uploadConfig);

usersRoutes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const user = await new CreateUserService().execute({
    name, email, password,
  });

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.status(201).send({ user: userWithoutPassword });
});

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const user = await new UpdateUserAvatarService().execute(
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

    response.json({ user: userWithoutPassword });
  },
);

export default usersRoutes;
