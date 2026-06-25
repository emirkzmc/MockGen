import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { IStorage, PG_POOL_TOKEN } from '../contracts/storage.interface';

@Injectable()
export class DatabaseStorageService implements IStorage {
  constructor(@Inject(PG_POOL_TOKEN) private readonly pool: Pool) {}

  async findByPathAndMethod(
    path: string,
    method: string,
  ): Promise<{ schema: Record<string, unknown>; userId: string } | null> {
    const query = `
      SELECT schema, user_id
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
      return {
        schema: rawSchema as Record<string, unknown>,
        userId: result.rows[0].user_id,
      };
    }

    return null;
  }

  async save(
    userId: string,
    path: string,
    method: string,
    schema: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const query = `
      INSERT INTO endpoints (user_id, path, method, schema)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (path, method) 
      DO UPDATE SET schema = EXCLUDED.schema, user_id = EXCLUDED.user_id
      RETURNING *
    `;
    const res = await this.pool.query(query, [
      userId,
      path,
      method,
      JSON.stringify(schema),
    ]);
    return res.rows[0];
  }

  async findAllEndpoints(userId: string): Promise<Record<string, unknown>[]> {
    const query = `
      SELECT id, path, method, schema, created_at as "createdAt"
      FROM endpoints 
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;
    const result = await this.pool.query(query, [userId]);
    return result.rows.map(row => {
      const keysCount = Object.keys(row.schema).length;
      return {
        ...row,
        count: keysCount
      };
    });
  }

  async findEndpointById(
    id: string,
    userId: string,
  ): Promise<Record<string, unknown> | null> {
    const query = `
      SELECT id, path, method, schema, created_at as "createdAt"
      FROM endpoints 
      WHERE id = $1 AND user_id = $2
      LIMIT 1
    `;
    const result = await this.pool.query(query, [id, userId]);
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      ...row,
      count: Object.keys(row.schema).length
    };
  }

  async updateEndpoint(
    id: string,
    userId: string,
    path: string,
    method: string,
    schema: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const query = `
      UPDATE endpoints 
      SET path = $1, method = $2, schema = $3
      WHERE id = $4 AND user_id = $5
      RETURNING id, path, method, schema, created_at as "createdAt"
    `;
    const res = await this.pool.query(query, [
      path,
      method,
      JSON.stringify(schema),
      id,
      userId,
    ]);
    if (res.rows.length === 0) {
      throw new Error('Endpoint not found or unauthorized');
    }
    const row = res.rows[0];
    return {
      ...row,
      count: Object.keys(row.schema).length
    };
  }

  async deleteEndpoint(id: string, userId: string): Promise<void> {
    const query = `
      DELETE FROM endpoints 
      WHERE id = $1 AND user_id = $2
    `;
    await this.pool.query(query, [id, userId]);
  }

  async getLogs(userId: string): Promise<Record<string, unknown>[]> {
    const query = `
      SELECT id, method, path, headers, body, created_at as timestamp
      FROM logs 
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT 100
    `;
    const result = await this.pool.query(query, [userId]);
    return result.rows;
  }

  async saveLog(
    userId: string,
    method: string,
    path: string,
    headers: Record<string, unknown>,
    body: Record<string, unknown> | null,
  ): Promise<void> {
    const query = `
      INSERT INTO logs (user_id, method, path, headers, body)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await this.pool.query(query, [
      userId,
      method,
      path,
      JSON.stringify(headers),
      body ? JSON.stringify(body) : null,
    ]);
  }
}
