import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: '1',
      name: 'Leandro',
      username: 'leandrosouara',
      password: '1234567898m',
    },
    {
      id: '2',
      name: 'Vitor',
      username: 'vitinhomelo',
      password: '1234567898m',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
