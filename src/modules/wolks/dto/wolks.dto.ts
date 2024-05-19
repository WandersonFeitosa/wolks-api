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
  @ApiProperty({ example: 'This is a car' })
  info: string;

  @IsString()
  @ApiProperty({
    example:
      'https://storage.googleapis.com/download/storage/v1/b/wolks/o/b113696c-9ab7-4851-ac04-fa034e7860d7chevrolet-celta-em-sorocaba-sp-efe9a5bef18-00.jpeg?generation=1716100471846404&alt=media',
  })
  @IsOptional()
  image_url?: string;
}
export class RegisterCarWithImageDTO {
  @IsString()
  model: string;

  @IsString()
  year: string;

  @IsString()
  price: string;

  @IsString()
  info: string;
}

export class UpdateCarDTO {
  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Toyota' })
  model?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '2021' })
  year?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 1000000 })
  price?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'This is a car' })
  info?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example:
      'https://storage.googleapis.com/download/storage/v1/b/wolks/o/b113696c-9ab7-4851-ac04-fa034e7860d7chevrolet-celta-em-sorocaba-sp-efe9a5bef18-00.jpeg?generation=1716100471846404&alt=media',
  })
  image_url?: string;
}

export class UpdateCarWithImageDTO {
  @IsString()
  @IsOptional()
  model?: string;

  @IsString()
  @IsOptional()
  year?: string;

  @IsString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsOptional()
  info?: string;
}
