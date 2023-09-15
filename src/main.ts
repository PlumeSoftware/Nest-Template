import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    optionsSuccessStatus: 204
  })
  app.useStaticAssets(`static`, { prefix: '/static/' });
  await app.listen(process.env.PORT || 39460);
}
bootstrap();
