import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './my-logger/my-logger.service';
import { AllExceptionsFilter } from './all-exceptions.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new MyLoggerService(),
  });

  const logger = app.get(MyLoggerService);
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
