import { Injectable, Inject } from '@nestjs/common';
import { Pool } from 'pg';
import { IStorage, PG_POOL_TOKEN } from '../contracts/storage.interface';

@Injectable()
export class DatabaseStorageService implements IStorage {
  constructor(@Inject(PG_POOL_TOKEN) private readonly pool: Pool) {}

  // --- Schemas ---
  async createSchema(
    userId: string,
    name: string,
    schema: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const query = `
      INSERT INTO schemas (user_id, name, schema)
      VALUES ($1, $2, $3)
      RETURNING id, name, schema, created_at as "createdAt"
    `;
    const res = await this.pool.query(query, [userId, name, JSON.stringify(schema)]);
    return res.rows[0];
  }

  async findAllSchemas(userId: string): Promise<Record<string, unknown>[]> {
    const query = `
      SELECT id, name, schema, created_at as "createdAt"
      FROM schemas
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;
    const result = await this.pool.query(query, [userId]);
    return result.rows;
  }

  async findSchemaById(id: string, userId: string): Promise<Record<string, unknown> | null> {
    const query = `
      SELECT id, name, schema, created_at as "createdAt"
      FROM schemas
      WHERE id = $1 AND user_id = $2
      LIMIT 1
    `;
    const result = await this.pool.query(query, [id, userId]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async updateSchema(
    id: string,
    userId: string,
    name: string,
    schema: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const query = `
      UPDATE schemas
      SET name = $1, schema = $2
      WHERE id = $3 AND user_id = $4
      RETURNING id, name, schema, created_at as "createdAt"
    `;
    const res = await this.pool.query(query, [name, JSON.stringify(schema), id, userId]);
    if (res.rows.length === 0) {
      throw new Error('Schema not found or unauthorized');
    }
    return res.rows[0];
  }

  async deleteSchema(id: string, userId: string): Promise<void> {
    const query = `
      DELETE FROM schemas
      WHERE id = $1 AND user_id = $2
    `;
    await this.pool.query(query, [id, userId]);
  }

  // --- Endpoints ---
  async findByPathAndMethod(
    path: string,
    method: string,
  ): Promise<{ schema: Record<string, unknown>; userId: string; count: number } | null> {
    const query = `
      SELECT s.schema, e.user_id, e.mock_count
      FROM endpoints e
      JOIN schemas s ON e.schema_id = s.id
      WHERE e.path = $1 AND e.method = $2 
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
        count: typeof result.rows[0].mock_count === 'number' ? result.rows[0].mock_count : 5,
      };
    }

    return null;
  }

  async save(
    userId: string,
    schemaId: string,
    path: string,
    method: string,
    count: number,
  ): Promise<Record<string, unknown>> {
    const query = `
      INSERT INTO endpoints (user_id, schema_id, path, method, mock_count)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (path, method) 
      DO UPDATE SET schema_id = EXCLUDED.schema_id, user_id = EXCLUDED.user_id, mock_count = EXCLUDED.mock_count
      RETURNING id, schema_id as "schemaId", path, method, mock_count as "count", created_at as "createdAt"
    `;
    const res = await this.pool.query(query, [
      userId,
      schemaId,
      path,
      method,
      count,
    ]);
    return res.rows[0];
  }

  async findAllEndpoints(userId: string): Promise<Record<string, unknown>[]> {
    const query = `
      SELECT e.id, e.path, e.method, e.schema_id as "schemaId", e.mock_count as "count", e.created_at as "createdAt", s.name as "schemaName"
      FROM endpoints e
      LEFT JOIN schemas s ON e.schema_id = s.id
      WHERE e.user_id = $1
      ORDER BY e.created_at DESC
    `;
    const result = await this.pool.query(query, [userId]);
    return result.rows;
  }

  async findEndpointById(
    id: string,
    userId: string,
  ): Promise<Record<string, unknown> | null> {
    const query = `
      SELECT id, path, method, schema_id as "schemaId", mock_count as "count", created_at as "createdAt"
      FROM endpoints 
      WHERE id = $1 AND user_id = $2
      LIMIT 1
    `;
    const result = await this.pool.query(query, [id, userId]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async updateEndpoint(
    id: string,
    userId: string,
    schemaId: string,
    path: string,
    method: string,
    count: number,
  ): Promise<Record<string, unknown>> {
    const query = `
      UPDATE endpoints 
      SET path = $1, method = $2, schema_id = $3, mock_count = $4
      WHERE id = $5 AND user_id = $6
      RETURNING id, path, method, schema_id as "schemaId", mock_count as "count", created_at as "createdAt"
    `;
    const res = await this.pool.query(query, [
      path,
      method,
      schemaId,
      count,
      id,
      userId,
    ]);
    if (res.rows.length === 0) {
      throw new Error('Endpoint not found or unauthorized');
    }
    return res.rows[0];
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
