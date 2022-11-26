import { Inject, Injectable } from '@nestjs/common';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { MessageHelper as UserMessageHelper } from 'src/users/helpers/message.helper';
import { Repository } from 'typeorm';
import { MessageHelper } from 'src/projects/helpers/message.helper';

interface IProjectUpdate {
  id: string;
  title: string;
  zip_code: number;
  cost: number;
  deadline: string;
  username: string;
}

export interface IResponseProjectUpdated {
  title: string;
  zip_code: number;
  cost: number;
  deadline: string;
  username: string;
  created_at: string;
  updated_at: string;
  done: boolean;
}

Injectable();
export class UpdateProjectUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,
  ) {}

  async execute(projectParams: IProjectUpdate) {
    const userExists = await this.userRepository.findOne({
      where: { username: projectParams.username },
    });

    if (!userExists) {
      throw new Error(UserMessageHelper.USER_NOT_EXISTS);
    }

    const projectExists = await this.projectRepository.findOne({
      where: { id: projectParams.id },
    });

    if (!projectExists) {
      throw new Error(MessageHelper.PROJECT_NOT_EXISTS);
    }

    if (projectExists.userId !== userExists.id) {
      throw new Error(MessageHelper.PROJECT_INVALID_OWNER);
    }

    projectExists.title = projectParams.title ?? projectExists.title;
    projectExists.zip_code = projectParams.zip_code ?? projectExists.zip_code;
    projectExists.cost = projectParams.cost ?? projectExists.cost;
    projectExists.deadline = projectParams.deadline ?? projectExists.deadline;

    await this.projectRepository.save(projectExists);

    return {
      title: projectExists.title,
      zip_code: projectExists.zip_code,
      cost: projectExists.cost,
      username: userExists.username,
      deadline: projectExists.deadline,
      created_at: projectExists.created_at,
      updated_at: projectExists.updated_at,
      done: projectExists.done,
    } as IResponseProjectUpdated;
  }
}
