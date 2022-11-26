import {
  Body,
  Controller,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateProjectDto } from 'src/projects/dtos/update-project.dto';
import {
  IResponseProjectUpdated,
  UpdateProjectUseCase,
} from './update.usecase';

@Controller('projects')
export class UpdateProjectController {
  constructor(private readonly useCase: UpdateProjectUseCase) {}

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateProject(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
    @Headers() headers: any,
    @Request() req: any,
  ): Promise<IResponseProjectUpdated> {
    try {
      return await this.useCase.execute({
        id,
        title: updateProjectDto.title,
        zip_code: updateProjectDto.zip_code,
        cost: updateProjectDto.cost,
        deadline: updateProjectDto.deadline,
        username: headers.username ?? req.user.username,
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
