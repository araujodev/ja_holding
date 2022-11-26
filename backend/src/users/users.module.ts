import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { CreateUserController } from './usecases/create/create.controller';
import { CreateUserUseCase } from './usecases/create/create.usecase';
import { MeController } from './usecases/me/me.controller';
import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, CreateUserUseCase],
  controllers: [MeController, CreateUserController],
})
export class UsersModule {}
