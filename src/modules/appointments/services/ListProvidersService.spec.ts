import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/cacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProvidersService: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProvidersService = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list the providers except logged user', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Teste 1',
      email: 'teste1@teste.com.br',
      password: '123456'
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Teste 2',
      email: 'teste2@teste.com.br',
      password: '123456'
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Teste 3',
      email: 'teste3@teste.com.br',
      password: '123456'
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id
    });

    expect(providers).toEqual([user1, user2]);
  });
})
