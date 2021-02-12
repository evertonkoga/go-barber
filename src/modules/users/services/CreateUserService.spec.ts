import AppError from "@shared/errors/AppError";
import FakeCacheProvider from "@shared/container/providers/cacheProvider/fakes/FakeCacheProvider";
import FakeHashProvider from "../providers/hashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import CreateUserService from "./CreateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Teste',
      email: 'teste@teste.com.br',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a two user with same email', async () => {
    const userEmail = 'teste@teste.com.br';

    await createUser.execute({
      name: 'Teste',
      email: userEmail,
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'Teste',
        email: userEmail,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
})
