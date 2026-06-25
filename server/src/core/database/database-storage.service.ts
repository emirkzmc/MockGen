import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { IStorage, PG_POOL_TOKEN } from '../contracts/storage.interface';

@Injectable()
export class DatabaseStorageService implements IStorage {
  constructor(@Inject(PG_POOL_TOKEN) private readonly pool: Pool) {}

  async findByPathAndMethod(
    path: string,
    method: string,
  ): Promise<Record<string, unknown> | null> {
    const query = `
      SELECT schema 
      FROM endpoints 
      WHERE path = $1 AND method = $2 
      LIMIT 1
    `;
    const result = await this.pool.query(query, [path, method]);

    if (result.rows.length === 0) {
      return null;
    }

    const rawSchema: unknown = result.rows[0].schema;
    if (
      typeof rawSchema === 'object' &&
      rawSchema !== null &&
      !Array.isArray(rawSchema)
    ) {
      return rawSchema as Record<string, unknown>;
    }

    return null;
  }

  async save(
    userId: string,
    path: string,
    method: string,
    schema: Record<string, unknown>,
  ): Promise<void> {
    const query = `
      INSERT INTO endpoints (user_id, path, method, schema)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (path, method) 
      DO UPDATE SET schema = EXCLUDED.schema, user_id = EXCLUDED.user_id
    `;
    await this.pool.query(query, [
      userId,
      path,
      method,
      JSON.stringify(schema),
    ]);
  }
}
