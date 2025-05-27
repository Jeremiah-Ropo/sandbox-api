import { Body, Controller, Post, Param, Get } from '@nestjs/common';
import { ConfigService } from './config.service';
import { ConfigInput } from './dto';

@Controller('config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Post()
  saveConfig(@Body() configData: ConfigInput): Promise<{ success: boolean; message: string } | void> {
      try {
            return this.configService.saveConfig(configData);
      } catch (error) {
            console.error(error);
          throw new Error(`Failed to save configuration: ${error.message}`);
      }
    }
    
    @Get(':name')
    getConfig(@Param('name') name: string): Promise<ConfigInput | undefined> {
        try {
            return this.configService.getConfig(name);
        } catch (error) {
            console.error(error);
            throw new Error(`Failed to get configuration: ${error.message}`);
        }
    }
}