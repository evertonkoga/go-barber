import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();

    showProfileService = new ShowProfileService(
      fakeUsersRepository,
    );
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com.br',
      password: '123456'
    });

    const profileUser = await showProfileService.execute({
      user_id: user.id
    });

    expect(profileUser.name).toEqual('Teste');
    expect(profileUser.email).toEqual('teste@teste.com.br');
  });

  it('should not be able show the profile from non-existing user', async () => {
    await expect(showProfileService.execute({
      user_id: 'non-existing-user-id'
    })).rejects.toBeInstanceOf(AppError);
  });
})
