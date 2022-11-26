import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsNumber()
  @IsOptional()
  zip_code: number;

  @IsString()
  @IsOptional()
  deadline: string;

  @IsNumber()
  @IsOptional()
  cost: number;
}
