import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICacheProvider from '@shared/container/providers/cacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

interface Request {
  user_id?: string;
}

@injectable()
class ListProvidersServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ user_id }: Request): Promise<User[]> {
    const cacheKey = `providers-list:${user_id}`;

    let users = await this.cacheProvider.recover<User[]>(cacheKey);

    if (!users) {
      users = await this.usersRepository.findAllProviders({ except_user_id: user_id });

      await this.cacheProvider.save(cacheKey, classToClass(users));
    }

    return users;
  }
}

export default ListProvidersServices;
