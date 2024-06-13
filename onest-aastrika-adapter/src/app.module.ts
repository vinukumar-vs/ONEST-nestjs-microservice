import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, { provide: 'AASTRIKA_ONEST_ADAPTER', useValue: {} }],
})
export class AppModule {}
