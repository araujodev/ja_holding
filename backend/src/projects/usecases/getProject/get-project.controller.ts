import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import {
  GetProjectUseCase,
  ICustomProjectResponse,
} from './get-project.usecase';

@Controller('projects')
export class GetProjectController {
  constructor(private readonly useCase: GetProjectUseCase) {}

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getOneProject(
    @Param('id') id: string,
  ): Promise<ICustomProjectResponse> {
    try {
      return await this.useCase.execute(id);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
