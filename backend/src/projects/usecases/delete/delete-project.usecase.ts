import { Inject, Injectable } from '@nestjs/common';
import { Project } from 'src/projects/entities/project.entity';
import { MessageHelper } from 'src/projects/helpers/message.helper';
import { MessageHelper as UserMessageHelper } from 'src/users/helpers/message.helper';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

interface IDeleteRequest {
  username: string;
  id: string;
}

Injectable();
export class DeleteProjectUseCase {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async execute(projectParams: IDeleteRequest): Promise<void> {
    const userExists = await this.userRepository.findOne({
      where: { username: projectParams.username },
    });

    if (!userExists) {
      throw new Error(UserMessageHelper.USER_NOT_EXISTS);
    }

    const project = await this.projectRepository.findOne({
      where: { id: projectParams.id },
    });

    if (!project) {
      throw new Error(MessageHelper.PROJECT_NOT_EXISTS);
    }

    if (project.userId !== userExists.id) {
      throw new Error(MessageHelper.PROJECT_INVALID_OWNER);
    }

    await this.projectRepository.remove(project);
  }
}
