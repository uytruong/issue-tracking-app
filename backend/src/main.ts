import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Config swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Issue Tracking')
    .setDescription('API Documentation')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors();
  await app.listen(AppModule.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
