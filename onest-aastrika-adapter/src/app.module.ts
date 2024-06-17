import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AastrikaService } from './aastrika.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AastrikaService, { provide: 'AASTRIKA_ONEST_ADAPTER', useValue: {} }],
})
export class AppModule {}
