import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Questionários')
    .setDescription('Documentação da API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, '../swagger.json');
  SwaggerModule.setup('api', app, document);

  await app.listen(4000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
