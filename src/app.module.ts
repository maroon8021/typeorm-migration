import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { UserController } from './application/controller/user.controller';
import { User } from './domain/model/user';
import { UserService } from './domain/service/user.service';
import { UserRepository } from './infrastructure/repository/user';
import { typeormConfig } from './util/typeorm';

@Module({
  imports: [
    //TypeOrmModule.forRoot()// ormconfig.jsを読み込むために必要
    TypeOrmModule.forRoot({ ...typeormConfig } as any),
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
