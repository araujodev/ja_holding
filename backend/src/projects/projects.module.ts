import { Module } from '@nestjs/common';
import { CommonModule } from 'src/common/common.module';
import { DatabaseModule } from 'src/database.module';
import { userProviders } from 'src/users/user.providers';
import { projectProviders } from './project.providers';
import { ChangeStatusProjectController } from './usecases/changeStatus/change-status-project.controller';
import { ChangeProjectStatusUseCase } from './usecases/changeStatus/change-status-project.usecase';
import { CreateProjectController } from './usecases/create/create.controller';
import { CreateProjectUseCase } from './usecases/create/create.usecase';
import { DeleteProjectController } from './usecases/delete/delete-project.controller';
import { DeleteProjectUseCase } from './usecases/delete/delete-project.usecase';
import { GetProjectController } from './usecases/getProject/get-project.controller';
import { GetProjectUseCase } from './usecases/getProject/get-project.usecase';
import { ListProjectsController } from './usecases/list/list.controller';
import { ListProjectsUseCase } from './usecases/list/list.usecase';
import { UpdateProjectController } from './usecases/update/update.controller';
import { UpdateProjectUseCase } from './usecases/update/update.usecase';

@Module({
  imports: [DatabaseModule, CommonModule],
  providers: [
    ...userProviders,
    ...projectProviders,
    CreateProjectUseCase,
    ListProjectsUseCase,
    GetProjectUseCase,
    UpdateProjectUseCase,
    ChangeProjectStatusUseCase,
    DeleteProjectUseCase,
  ],
  controllers: [
    CreateProjectController,
    ListProjectsController,
    GetProjectController,
    UpdateProjectController,
    ChangeStatusProjectController,
    DeleteProjectController,
  ],
})
export class ProjectsModule {}
