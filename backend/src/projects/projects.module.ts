import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { userProviders } from 'src/users/user.providers';
import { projectProviders } from './project.providers';
import { CreateProjectController } from './usecases/create/create.controller';
import { CreateProjectUseCase } from './usecases/create/create.usecase';
import { ListProjectsController } from './usecases/list/list.controller';
import { ListProjectsUseCase } from './usecases/list/list.usecase';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    ...projectProviders,
    CreateProjectUseCase,
    ListProjectsUseCase,
  ],
  controllers: [CreateProjectController, ListProjectsController],
})
export class ProjectsModule {}
