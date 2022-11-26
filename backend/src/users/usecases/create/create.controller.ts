import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CreateUserUseCase } from './create.usecase';

@Controller('users')
export class CreateController {
  constructor(private readonly useCase: CreateUserUseCase) {}

  @Post()
  async getProfile(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.useCase.execute({
        name: createUserDto.name,
        username: createUserDto.username,
        password: createUserDto.password,
      });
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
