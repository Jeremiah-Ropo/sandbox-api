import { Controller, Post, Param, Body } from "@nestjs/common";
import { ApiService } from "./api.service";

@Controller('api')
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post(':name')
  async useApi(@Param('name') name: string, @Body() body: any): Promise<any> {
      try {
      return await this.apiService.triggerCustomApi(name, body);
    } catch (error) {
      throw new Error(error.message);
    }
  }

}