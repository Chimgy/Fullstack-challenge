import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001', // frontend URL (will change with aws)
    credentials: true,
  });

  console.log('=================================');
  console.log('CHOKIDAR_USEPOLLING:', process.env.CHOKIDAR_USEPOLLING);
  console.log('CHOKIDAR_INTERVAL:', process.env.CHOKIDAR_INTERVAL);
  console.log('=================================');

  const port = parseInt(process.env.PORT || '3000');
  await app.listen(port, '0.0.0.0');  // listen on all interface
  console.log(`Backend running on http://localhost:${port}`);
}
bootstrap();
