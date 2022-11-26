import {
  Controller,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ChangeProjectStatusUseCase,
  ICustomProjectResponse,
} from './change-status-project.usecase';

@Controller('projects')
export class ChangeStatusProjectController {
  constructor(private readonly useCase: ChangeProjectStatusUseCase) {}

  @Patch(':id/done')
  @UseGuards(JwtAuthGuard)
  async changeProjectStatus(
    @Param('id') id: string,
    @Headers() headers: any,
    @Request() req: any,
  ): Promise<ICustomProjectResponse> {
    try {
      return await this.useCase.execute({
        id,
        username: headers.username ?? req.user.username,
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
