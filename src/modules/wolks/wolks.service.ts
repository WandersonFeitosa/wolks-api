import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  RegisterCarDTO,
  RegisterCarWithImageDTO,
  UpdateCarDTO,
  UpdateCarWithImageDTO,
} from './dto/wolks.dto';
import { Car } from '@prisma/client';
import { FileService } from '../file/file.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WolksService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

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

  async registerCarWithImage({
    dto,
    file,
  }: {
    dto: RegisterCarWithImageDTO;
    file: any;
  }): Promise<Car> {
    try {
      const uuid = uuidv4();
      const fileBuffer = file.buffer;
      const fileName = uuid + file.originalname;
      const fileData = await this.fileService.uploadFile({
        name: fileName,
        buffer: fileBuffer,
      });

      const car = await this.prisma.car.create({
        data: {
          info: dto.info,
          model: dto.model,
          price: parseInt(dto.price),
          year: dto.year,
          image_url: fileData.metadata.mediaLink,
        },
      });
      return car;
    } catch (error) {
      console.log(error);
      throw new HttpException('Internal Server Error', 500);
    }
  }

  async updateCarWithImage({
    id,
    dto,
    file,
  }: {
    id: string;
    dto: UpdateCarWithImageDTO;
    file?: any;
  }): Promise<Car> {
    try {
      const car = await this.prisma.car.findFirst({
        where: { id },
      });
      if (!car) {
        throw new HttpException('Car not found', 404);
      }

      let image_url = car.image_url;

      if (file) {
        const uuid = uuidv4();
        const fileBuffer = file.buffer;
        const fileName = uuid + file.originalname;
        const fileData = await this.fileService.uploadFile({
          name: fileName,
          buffer: fileBuffer,
        });
        image_url = fileData.metadata.mediaLink;
      }

      return await this.prisma.car.update({
        where: { id },
        data: {
          info: dto.info || car.info,
          model: dto.model || car.model,
          price: parseInt(dto.price) || car.price,
          year: dto.year || car.year,
          image_url,
        },
      });
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw new HttpException(error.message, error.getStatus());
      }
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
