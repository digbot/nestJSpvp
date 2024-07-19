import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private readonly configService: ConfigService) {}

  async findOne(username: string): Promise<User | undefined> {
    const users = [
      {
        userId: 1,
        username: 'digger',
        password: await this.configService.get('DB_PASSWORD'),
      },
    ];
    console.log(users);
    return users.find((User) => User.username === username);
  }
}
