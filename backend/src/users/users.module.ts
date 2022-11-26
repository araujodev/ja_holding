import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { UsersService } from './services/users.service';
import { CreateController } from './usecases/create/create.controller';
import { CreateUserUseCase } from './usecases/create/create.usecase';
import { MeController } from './usecases/me/me.controller';
import { userProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UsersService, CreateUserUseCase],
  controllers: [MeController, CreateController],
})
export class UsersModule {}
