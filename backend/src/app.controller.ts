import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // test
  @Get('hello')
  getHello(): object {
    return {
      message: "Dockerized Backend says Hello! TEST",
      timestamp: new Date().toISOString(),
      environment: 'Docker Container',
    };
  }
}
