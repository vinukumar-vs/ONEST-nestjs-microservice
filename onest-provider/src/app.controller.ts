import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { SearchService } from './services/search.service';
import { SelectService } from './services/select.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly searchService: SearchService,
    private readonly selectService: SelectService,) { }


  @Post('search')
  async search(@Param('clientId') clientId: string, @Body() searchData: any, @Res() res: Response) {
    res.status(200).send('Acknowledgement received');

    try {
      await this.searchService.search(searchData);
    } catch (error) {
      res.status(500).send('Error processing request');
    }
  }

  @Post('select')
  async select(@Param('clientId') clientId: string, @Body() searchData: any, @Res() res: Response) {
    res.status(200).send('Acknowledgement received');

    try {
      await this.selectService.select(searchData);
    } catch (error) {
      res.status(500).send('Error processing request');
    }
  }
}
