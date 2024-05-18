import { Module } from '@nestjs/common';
import { WolksController } from './wolks.controller';
import { WolksService } from './wolks.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [WolksController],
  providers: [WolksService],
})
export class WolksModule {}
