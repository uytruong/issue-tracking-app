import { Global, Module } from '@nestjs/common';
import { BaseService } from './base.service';
import { ConfigService } from './config/config.service';

@Global()
@Module({
  providers: [ConfigService, BaseService],
  exports: [ConfigService, BaseService]
})
export class SharedModule {}
