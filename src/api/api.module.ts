import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [ConfigModule ],
  controllers: [ApiController],
  providers: [ApiService, ConfigService],
})
export class ApiModule {}