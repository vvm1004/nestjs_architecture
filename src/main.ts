import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
async function bootstrap() {

  const app = await NestFactory.create(
    AppModule.register({
      driver: (process.env.DB_DRIVER as 'orm' | 'in-memory') || 'orm', 
    }),
  );
  
  const configService = app.get(ConfigService);  
  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port);

}
bootstrap();
