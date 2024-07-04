import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'digger',
      password: '123123z',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((User) => User.username === username);
  }
}
