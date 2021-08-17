import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';
import { Issue, IssueSchema } from './models/issue.model';
import * as AutoIncrementFactory from 'mongoose-sequence';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Issue.name,
        useFactory: async (connection: Connection) => {
          const schema = IssueSchema;
          const AutoIncrement = AutoIncrementFactory(connection);
          schema.plugin(AutoIncrement);
          return schema;
        },
        inject: [getConnectionToken()]
      }
    ])
  ],
  controllers: [IssuesController],
  providers: [IssuesService]
})
export class IssuesModule {}
