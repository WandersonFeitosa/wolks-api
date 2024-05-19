import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { WolksService } from './wolks.service';
import { Car } from '@prisma/client';
import {
  RegisterCarDTO,
  RegisterCarWithImageDTO,
  UpdateCarDTO,
  UpdateCarWithImageDTO,
} from './dto/wolks.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('/v1/wolks/car')
export class WolksController {
  constructor(private readonly wolksService: WolksService) {}

  @Get('/')
  async getAllCars(): Promise<Car[]> {
    console.log('WolksController.getAllCars');
    return await this.wolksService.getAllCars();
  }

  @Get('/:id')
  async getCarById(@Param('id') id: string): Promise<Car> {
    console.log(`WolksController.getCarById(${id})`);
    return await this.wolksService.getCarById(id);
  }

  @Post('/')
  async registerCar(
    @Body()
    dto: RegisterCarDTO,
  ): Promise<Car> {
    console.log('WolksController.registerCar', dto);
    return await this.wolksService.registerCar(dto);
  }

  @Post('/with-image')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        model: {
          type: 'string',
          example: 'Toyota',
        },
        year: {
          type: 'string',
          example: '2021',
        },
        price: {
          type: 'string',
          example: '1000000',
        },
        info: {
          type: 'string',
          example: 'This is a car',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async registerCarWithImage(
    @UploadedFile() file,
    @Body() dto: RegisterCarWithImageDTO,
  ): Promise<Car> {
    console.log('WolksController.registerCarWithImage', dto);
    return await this.wolksService.registerCarWithImage({
      dto,
      file,
    });
  }

  @Patch('/with-image/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        model: {
          type: 'string',
        },
        year: {
          type: 'string',
        },
        price: {
          type: 'string',
        },
        info: {
          type: 'string',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async updateCarWithImage(
    @Param('id') id: string,
    @UploadedFile() file,
    @Body() dto: UpdateCarWithImageDTO,
  ): Promise<Car> {
    console.log(`WolksController.updateCarWithImage - ${id}`, dto);
    return await this.wolksService.updateCarWithImage({
      id,
      dto,
      file,
    });
  }

  @Patch('/:id')
  async updateCar(
    @Param('id') id: string,
    @Body()
    dto: UpdateCarDTO,
  ): Promise<Car> {
    console.log(`WolksController.updateCar - ${id}`, dto);
    return await this.wolksService.updateCar({
      id,
      dto,
    });
  }

  @Delete('/:id')
  async deleteCar(@Param('id') id: string): Promise<Car> {
    console.log(`WolksController.deleteCar(${id})`);
    return await this.wolksService.deleteCar(id);
  }
}
