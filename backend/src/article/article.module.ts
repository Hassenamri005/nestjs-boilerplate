import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticlesService } from './article.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArticleController],
  providers: [ArticlesService],
})
export class ArticleModule {}
