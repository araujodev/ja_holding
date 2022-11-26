import {
  Controller,
  Delete,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { DeleteProjectUseCase } from './delete-project.usecase';

@Controller('projects')
export class DeleteProjectController {
  constructor(private readonly useCase: DeleteProjectUseCase) {}

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async changeProjectStatus(
    @Param('id') id: string,
    @Headers() headers: any,
    @Request() req: any,
  ): Promise<void> {
    try {
      await this.useCase.execute({
        id,
        username: headers.username ?? req.user.username,
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
