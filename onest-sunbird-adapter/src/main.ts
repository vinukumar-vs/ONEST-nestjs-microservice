import { NestFactory } from '@nestjs/core';
import { SunbirdModule } from './app.module';
import { MicroserviceOptions, TcpOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SunbirdModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3011,
      },
    },
  );
  await app.listen();
}
bootstrap();
