import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}

  private readonly users = [
    {
      userId: 1,
      username: 'digger',
      password: this.configService.get('USER_PASSWORD'),
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((User) => User.username === username);
  }
}
