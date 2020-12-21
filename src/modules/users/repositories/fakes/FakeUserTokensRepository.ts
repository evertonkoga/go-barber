import { v4 as uuid_v4 } from "uuid";

import IUserTokensRepository from "../IUserTokensRepository";
import UserToken from "@modules/users/infra/typeorm/entities/UserToken";

class FakeUserTokensRepository implements IUserTokensRepository {

  private userToken: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken | undefined> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid_v4(),
      token: uuid_v4(),
      user_id,
    });

    this.userToken.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;
