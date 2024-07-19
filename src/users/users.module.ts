import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [UsersService, ConfigService],
  exports: [UsersService],
})
export class UsersModule {}
