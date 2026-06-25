import { Module, Global } from '@nestjs/common';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import { PG_POOL_TOKEN, STORAGE_TOKEN } from '../contracts/storage.interface';
import { DatabaseStorageService } from './database-storage.service';

dotenv.config();

const poolProvider = {
  provide: PG_POOL_TOKEN,
  useFactory: () => {
    return new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  },
};

const storageProvider = {
  provide: STORAGE_TOKEN,
  useClass: DatabaseStorageService,
};

@Global()
@Module({
  providers: [poolProvider, storageProvider],
  exports: [PG_POOL_TOKEN, STORAGE_TOKEN],
})
export class DatabaseModule {}
