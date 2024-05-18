import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WolksService } from './wolks.service';
import { Car } from '@prisma/client';
import { RegisterCarDTO, UpdateCarDTO } from './dto/wolks.dto';

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
