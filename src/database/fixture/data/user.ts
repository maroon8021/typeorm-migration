import { User } from 'src/domain/model/user';
import { EntityManager } from 'typeorm';
import { Fixture } from '../interface';

export class UserFixture extends Fixture {
  async run(manager: EntityManager) {
    await manager.getRepository(User).save([{ name: 'test-1' }]);
  }
}
