import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ConfigInput } from './dto';

@Injectable()
export class ConfigService {
  private storeConfig = new Map<string, ConfigInput>();
  private validateConfig(config: ConfigInput): boolean {
    if (!config.name || !config.method) {
      throw new Error('Name and method are required fields');
    }
    if (config.method !== 'POST') {
      throw new Error("Invalid HTTP method, should be 'POST'");
    }
    if (typeof config.body !== 'object' || Array.isArray(config.body)) {
      throw new Error('Body must be an object');
    }
    if (
      config.customValidation &&
      typeof config.customValidation !== 'string'
    ) {
      throw new BadRequestException('Custom validation must be a string');
    }
    if (!config.customValidation.includes('function')) {
      throw new BadRequestException(
        'Custom validation must include the called "function customValidation"',
      );
    }
    return true;
  }

  async saveConfig(config: ConfigInput) {
    try {
      this.validateConfig(config);
      this.storeConfig.set(config.name, config);
      return { success: true, message: 'Configuration saved successfully' };
    } catch (error) {
      console.error('Error saving configuration:', error);
      throw new InternalServerErrorException(`Failed to save configuration: ${error.message}`);
    }
  }

  async getConfig(name: string): Promise<ConfigInput | undefined> {
    try {
      return this.storeConfig.get(name);
    } catch (error) {
      console.error('Error getting configuration:', error);
      throw new InternalServerErrorException(`Failed to get configuration: ${error.message}`);
    }
  }
}
