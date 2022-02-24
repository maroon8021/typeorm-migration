import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../infrastructure/repository/user';
import { Connection, createConnection } from 'typeorm';
import { UserService } from './user.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import typeorm from 'typeorm';
import { User } from '../model/user';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '../../util/typeorm';

describe('UserService', () => {
  let service: UserService;
  let connection: Connection;

  // beforeAll(async () => {
  //   connection = await createConnection();
  //   console.log('beforeAll connection', connection);
  // });

  // afterAll(async () => {
  //   console.log('afterAll connection', connection);
  //   await connection.close();
  // });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({ ...typeormConfig } as any),
        TypeOrmModule.forFeature([User, UserRepository]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  describe('getUser', () => {
    it('getUser1', async () => {
      const queryRunner = connection.createQueryRunner();
      await queryRunner.startTransaction();

      jest.mock('typeorm', () => {
        const originalModule = jest.requireActual('typeorm');

        //Mock the default export and named export 'foo'
        return {
          __esModule: true,
          ...originalModule,
          getRepository: queryRunner.manager.getRepository,
        };
      });

      try {
        await queryRunner.manager.getRepository(User).save({
          name: 'getUser1-test',
        });

        const result = await service.getUser1();
        expect(result.length).toStrictEqual(2);
      } finally {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
      }
    });
  });
});
