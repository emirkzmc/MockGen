import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { AuthModule } from './auth/auth.module';
import { MockModule } from './mock/mock.module';

@Module({
  imports: [DatabaseModule, AuthModule, MockModule],
})
export class AppModule {}
