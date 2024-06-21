import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SearchService } from './services/search.service';
import { SelectService } from './services/select.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'EKSTEP_ONEST_ADAPTER',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3011,
        },
      },
      {
        name: 'AASTRIKA_ONEST_ADAPTER',
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3012,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [SearchService,SelectService],
})
export class AppModule {}
