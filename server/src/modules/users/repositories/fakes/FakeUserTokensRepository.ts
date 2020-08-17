import { uuid } from 'uuidv4';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokenRepository {
  private tokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const token = new UserToken();

    Object.assign(token, {
      id: uuid(),
      token: uuid(),
      usable: true,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.tokens.push(token);

    return token;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const findToken = this.tokens.find((useToken) => useToken.token === token);

    return findToken;
  }

  public async save(token: UserToken): Promise<UserToken> {
    this.tokens.push(token);

    return token;
  }
}
export default FakeUserTokensRepository;
