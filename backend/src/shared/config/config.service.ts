import { Injectable } from '@nestjs/common';
import { get } from 'config';
import { Config } from './config.enum';

@Injectable()
export class ConfigService {
  static dbConnectionString: string = process.env[Config.MONOGO_URI] || get(Config.MONOGO_URI);
  private environmentHosting: string = process.env.NODE_ENV || 'development';

  get(name: string) {
    return process.env[name] || get(name);
  }

  get isDevelopment(): boolean {
    return this.environmentHosting === 'development';
  }
}
