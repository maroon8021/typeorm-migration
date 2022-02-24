import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repository/user';
import { getRepository } from 'typeorm';
import { User } from '../model/user';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUser1() {
    console.log('this.userRepository', this.userRepository);
    return this.userRepository.find();
  }

  getUser2() {
    return getRepository(User).find();
  }
}
