import { Inject, Injectable } from '@nestjs/common';
import { AddressService } from 'src/common/services/address.service';
import { Project } from 'src/projects/entities/project.entity';
import { MessageHelper } from 'src/projects/helpers/message.helper';
import { Repository } from 'typeorm';

export interface ICustomProjectResponse {
  id: string;
  title: string;
  city: string;
  state: string;
  cost: number;
  done: boolean;
  deadline: string;
  userId: string;
  created_at: string;
  updated_at: string;
}

Injectable();
export class GetProjectUseCase {
  constructor(
    @Inject('PROJECT_REPOSITORY')
    private projectRepository: Repository<Project>,
    private readonly addressService: AddressService,
  ) {}

  async execute(projectId: string): Promise<ICustomProjectResponse> {
    const project = await this.projectRepository.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new Error(MessageHelper.PROJECT_NOT_EXISTS);
    }

    const address = await this.addressService.findByZipCode(
      String(project.zip_code),
    );

    return {
      id: project.id,
      title: project.title,
      city: address.city,
      state: address.state,
      cost: project.cost,
      done: project.done,
      deadline: project.deadline,
      userId: project.userId,
      created_at: project.created_at,
      updated_at: project.updated_at,
    } as ICustomProjectResponse;
  }
}
