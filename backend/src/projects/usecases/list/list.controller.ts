import {
  Controller,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Project } from 'src/projects/entities/project.entity';
import { ListProjectsUseCase } from './list.usecase';

@Controller('projects')
export class ListProjectsController {
  constructor(private readonly useCase: ListProjectsUseCase) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async listAllProjects(
    @Headers() headers: any,
    @Request() req: any,
  ): Promise<Project[]> {
    try {
      return await this.useCase.execute(headers.username ?? req.user.username);
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
