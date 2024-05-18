import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class RegisterCarDTO {
  @IsString()
  @ApiProperty({ example: 'Toyota' })
  model: string;

  @IsString()
  @ApiProperty({ example: '2021' })
  year: string;

  @IsNumber()
  @ApiProperty({ example: 1000000 })
  @Min(2000)
  @Max(220000)
  price: number;

  @IsString()
  @ApiProperty({ example: 'This is a car'})
  info: string;
}

export class UpdateCarDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Toyota'})
  model?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '2021'})
  year?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1000000})
  price?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'This is a car'})
  info?: string;
}
