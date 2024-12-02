import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:3000', // Allow this specific origin
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    credentials: true, // Include credentials if needed (cookies, auth headers)
  });
  await app.listen(3007);
}
bootstrap();
