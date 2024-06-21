import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SearchService } from './services/search.service';
import { SelectService } from './services/select.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [SearchService,SelectService, { provide: 'AASTRIKA_ONEST_ADAPTER', useValue: {} }],
})
export class AppModule {}
