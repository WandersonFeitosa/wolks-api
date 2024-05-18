import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterCarDTO, UpdateCarDTO } from './dto/wolks.dto';
import { Car } from '@prisma/client';

@Injectable()
export class WolksService {
  constructor(private prisma: PrismaService) {}

  async getAllCars(): Promise<Car[]> {
    try {
      return await this.prisma.car.findMany();
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async getCarById(id: string): Promise<Car> {
    try {
      const car = await this.prisma.car.findFirst({
        where: { id },
      });
      if (!car) {
        throw new HttpException('Car not found', 404);
      }
      return car;
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async registerCar(dto: RegisterCarDTO): Promise<Car> {
    try {
      return await this.prisma.car.create({
        data: dto,
      });
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async updateCar({
    id,
    dto,
  }: {
    id: string;
    dto: UpdateCarDTO;
  }): Promise<Car> {
    try {
      const car = await this.prisma.car.findFirst({
        where: { id },
      });
      if (!car) {
        throw new HttpException('Car not found', 404);
      }
      return await this.prisma.car.update({
        where: { id },
        data: dto,
      });
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async deleteCar(id: string): Promise<Car> {
    try {
      const car = await this.prisma.car.findFirst({
        where: { id },
      });
      if (!car) {
        throw new HttpException('Car not found', 404);
      }
      return await this.prisma.car.delete({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw new HttpException('Internal Server Error', 500);
    }
  }
}
