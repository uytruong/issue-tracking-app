import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from 'src/shared/config/config.service';
import { Config } from 'src/shared/config/config.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(Config.JWT_SECRET)
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.name, role: payload.role };
  }
}
