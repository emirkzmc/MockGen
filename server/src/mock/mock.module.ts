import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { MockController } from './mock.controller';
import { SchemaController } from './schema.controller';
import { MockMiddleware } from './mock.middleware';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [MockController, SchemaController],
})
export class MockModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MockMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
