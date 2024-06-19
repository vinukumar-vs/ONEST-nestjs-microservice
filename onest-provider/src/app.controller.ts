import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('search/:clientId')
  async search(@Param('clientId') clientId: string, @Body() searchData: any) {
    return await this.appService.search(clientId, searchData)
  }

  @Post('select/:clientId')
  async select(@Param('clientId') clientId: string, @Body() searchData: any) {
    return await this.appService.select(clientId, searchData)
  }
}
