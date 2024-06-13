import { Module } from '@nestjs/common';
import { SunbirdController } from './app.controller';
import { SunbirdService } from './app.service';

@Module({
  imports: [],
  controllers: [SunbirdController],
  providers: [
    SunbirdService,
    { provide: 'SUNBIRD_ONEST_ADAPTER', useValue: {} },
  ],
})
export class SunbirdModule {}
