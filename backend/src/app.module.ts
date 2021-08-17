import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Config } from './shared/config/config.enum';
import { ConfigService } from './shared/config/config.service';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './users/users.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ProjectsModule } from './projects/projects.module';
import { IssuesModule } from './issues/issues.module';

@Module({
  imports: [
    SharedModule,
    MongooseModule.forRoot(ConfigService.dbConnectionString),
    UsersModule,
    AutomapperModule.forRoot({
      options: [{ name: 'mapper', pluginInitializer: classes }],
      singular: true
    }),
    ProjectsModule,
    IssuesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  static host: string;
  static port: number | string;
  static isDev: boolean;

  constructor(private configService: ConfigService) {
    AppModule.port = AppModule.normalizePort(configService.get(Config.PORT));
    AppModule.host = configService.get(Config.HOST);
    AppModule.isDev = configService.isDevelopment;
  }

  private static normalizePort(param: number | string): number | string {
    const portNumber: number = typeof param === 'string' ? parseInt(param, 10) : param;
    if (isNaN(portNumber)) {
      return param;
    } else if (portNumber >= 0) {
      return portNumber;
    }
  }
}
