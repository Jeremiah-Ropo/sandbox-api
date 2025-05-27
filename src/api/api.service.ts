import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { runSandboxedCode } from 'src/sandbox';
import { predefinedNextActionFunction } from 'src/predefine-handler';

@Injectable()
export class ApiService {
    constructor(private readonly configService: ConfigService) { }
    
    async triggerCustomApi(name: string, body: any): Promise<any> {
        try {
            const config = await this.configService.getConfig(name);
            if (!config) {
                throw new NotFoundException(`Configuration for ${name} not found`);
            }
            const triggeredAction = await runSandboxedCode(config.customValidation, body);

            if (!triggeredAction.isValid ) {
                return { success: false, message: triggeredAction.message };
            }

            return predefinedNextActionFunction(triggeredAction);

        } catch (error) {
            // console.error(`Error in triggerCustomApi: ${error.message}`);
            throw new BadRequestException(error.message)
        }
    }
}