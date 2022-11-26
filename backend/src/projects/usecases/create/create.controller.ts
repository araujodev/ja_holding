import {
  Body,
  Controller,
  Headers,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateProjectDto } from 'src/projects/dtos/create-project.dto';
import {
  CreateProjectUseCase,
  IResponseProjectCreated,
} from './create.usecase';

@Controller('projects')
export class CreateProjectController {
  constructor(private readonly useCase: CreateProjectUseCase) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createProject(
    @Body() createProjectDto: CreateProjectDto,
    @Headers() headers: any,
    @Request() req: any,
  ): Promise<IResponseProjectCreated> {
    try {
      return await this.useCase.execute({
        title: createProjectDto.title,
        zip_code: createProjectDto.zip_code,
        cost: createProjectDto.cost,
        deadline: createProjectDto.deadline,
        username: headers.username ?? req.user.username,
      });
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
