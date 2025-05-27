import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigController } from './config/config.controller';
import { ConfigService } from './config/config.service';
import { ApiService } from './api/api.service';
import { ApiController } from './api/api.controller';

@Module({
  imports: [],
  controllers: [AppController, ConfigController, ApiController],
  providers: [AppService, ConfigService, ApiService],
})
export class AppModule {}
