import { Inject, Injectable } from '@nestjs/common';
import { Project } from 'src/projects/entities/project.entity';
import { MessageHelper } from 'src/projects/helpers/message.helper';
import { MessageHelper as UserMessageHelper } from 'src/users/helpers/message.helper';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

interface IChangeStatusRequest {
  username: string;
  id: string;
}

export interface ICustomProjectResponse {
  id: string;
  title: string;
  zip_code: number;
  cost: number;
  done: boolean;
  deadline: string;
  userId: string;
  created_at: string;
  updated_at: string;
}

Injectable();
export class ChangeProjectStatusUseCase {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async execute(
    projectParams: IChangeStatusRequest,
  ): Promise<ICustomProjectResponse> {
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

    project.done = true;
    this.projectRepository.save(project);

    return {
      id: project.id,
      title: project.title,
      zip_code: project.zip_code,
      cost: project.cost,
      done: project.done,
      deadline: project.deadline,
      userId: project.userId,
      created_at: project.created_at,
      updated_at: project.updated_at,
    } as ICustomProjectResponse;
  }
}
