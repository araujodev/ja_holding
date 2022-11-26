import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { userProviders } from 'src/users/user.providers';
import { projectProviders } from './project.providers';
import { CreateProjectController } from './usecases/create/create.controller';
import { CreateProjectUseCase } from './usecases/create/create.usecase';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, ...projectProviders, CreateProjectUseCase],
  controllers: [CreateProjectController],
})
export class ProjectsModule {}
