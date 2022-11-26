import { Inject, Injectable } from '@nestjs/common';
import { Project } from 'src/projects/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { MessageHelper as UserMessageHelper } from 'src/users/helpers/message.helper';
import { Repository } from 'typeorm';
import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

interface IProjectCreate {
  title: string;
  zip_code: number;
  cost: number;
  deadline: string;
  username: string;
}

export interface IResponseProjectCreated {
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
export class CreateProjectUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<User>,
  ) {}

  async execute(projectParams: IProjectCreate) {
    const userExists = await this.userRepository.findOne({
      where: { username: projectParams.username },
    });

    if (!userExists) {
      throw new Error(UserMessageHelper.USER_NOT_EXISTS);
    }

    const project = {
      id: uuid(),
      title: projectParams.title,
      zip_code: projectParams.zip_code,
      cost: projectParams.cost,
      deadline: DateTime.fromISO(projectParams.deadline).toUTC().toISO(),
      user: userExists,
      created_at: DateTime.now().toUTC().toISO(),
      updated_at: DateTime.now().toUTC().toISO(),
      done: false,
    } as Project;

    await this.projectRepository.save(project);

    return {
      title: project.title,
      zip_code: project.zip_code,
      cost: project.cost,
      username: project.user.username,
      deadline: project.deadline,
      created_at: project.created_at,
      updated_at: project.updated_at,
      done: project.done,
    } as IResponseProjectCreated;
  }
}
