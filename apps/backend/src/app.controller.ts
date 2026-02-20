import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello() {
    return {
      name: 'ScholaCBT API',
      version: '1.0.0',
      status: 'online',
      environment: process.env.NODE_ENV || 'development',
    };
  }
}
