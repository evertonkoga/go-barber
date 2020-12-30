import AppError from '@shared/errors/AppError';

import FakeUHashProvider from "../providers/hashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUHashProvider: FakeUHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUHashProvider = new FakeUHashProvider();
    fakeUsersRepository = new FakeUsersRepository();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeUHashProvider,
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com.br',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Teste 2',
      email: 'teste2@teste.com.br'
    });

    expect(updatedUser.name).toEqual('Teste 2');
    expect(updatedUser.email).toEqual('teste2@teste.com.br');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com.br',
      password: '123456'
    });

    const user = await fakeUsersRepository.create({
      name: 'Teste2',
      email: 'teste2@teste.com.br',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Teste 2',
      email: 'teste@teste.com.br'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com.br',
      password: '123456'
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Teste 2',
      email: 'teste2@teste.com.br',
      old_password: '123456',
      password: '123456'
    });

    expect(updatedUser.password).toEqual('123456');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com.br',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Teste 2',
      email: 'teste2@teste.com.br',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Teste',
      email: 'teste@teste.com.br',
      password: '123456'
    });

    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Teste 2',
      email: 'teste2@teste.com.br',
      old_password: 'wrong old password',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the profile from non-existing user', async () => {
    await expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'Teste 2',
      email: 'teste2@teste.com.br',
      old_password: 'wrong old password',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  });
})
