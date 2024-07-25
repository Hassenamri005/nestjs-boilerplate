import { Controller, Get } from '@nestjs/common';
import { ArticlesService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticlesService) {}

  @Get()
  create() {
    return this.articleService.findAll();
  }
}
