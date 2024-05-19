import { Module } from '@nestjs/common';
import { WolksController } from './wolks.controller';
import { WolksService } from './wolks.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FileModule } from '../file/file.module';

@Module({
  imports: [PrismaModule, FileModule],
  controllers: [WolksController],
  providers: [WolksService],
})
export class WolksModule {}
