import { Inject, Injectable } from '@nestjs/common';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { MessageHelper as UserMessageHelper } from 'src/users/helpers/message.helper';
import { Repository } from 'typeorm';

Injectable();
export class ListProjectsUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,
  ) {}

  async execute(projectOwner: string): Promise<Project[]> {
    const userExists = await this.userRepository.findOne({
      where: { username: projectOwner },
    });

    if (!userExists) {
      throw new Error(UserMessageHelper.USER_NOT_EXISTS);
    }

    return await this.projectRepository.find({
      where: { userId: userExists.id },
    });
  }
}
