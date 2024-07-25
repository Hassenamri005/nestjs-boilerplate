import { Module } from '@nestjs/common';
import { GeneratePdfService } from './generate-pdf.service';
import { GeneratePdfController } from './generate-pdf.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [GeneratePdfController],
  providers: [GeneratePdfService, PrismaService],
})
export class GeneratePdfModule {}
