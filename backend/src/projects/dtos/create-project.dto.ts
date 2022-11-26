import { IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsNumber()
  zip_code: number;

  @IsString()
  deadline: string;

  @IsNumber()
  cost: number;
}
