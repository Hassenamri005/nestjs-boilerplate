import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const fs = require('fs');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: [
      `${process.env.FRONTEND_URL}`, // Allow requests from your frontend URL
      'http://localhost:3000', // Allow requests from localhost:3000
    ],
    methods: ['*'],
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('TUNLOG')
    .setDescription('Tunlog apis')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await fs.writeFileSync('./swagger.json', JSON.stringify(document));

  await app.listen(6001);
}
bootstrap();
