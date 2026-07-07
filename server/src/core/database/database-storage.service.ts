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
    statusCode?: number,
  ): Promise<{ schema: Record<string, unknown> | null; userId: string; count: number; statusCode: number } | null> {
    let query = `
      SELECT e.user_id, e.mock_count, er.status_code, s.schema
      FROM endpoints e
      LEFT JOIN endpoint_responses er ON e.id = er.endpoint_id
      LEFT JOIN schemas s ON er.schema_id = s.id
      WHERE e.path = $1 AND e.method = $2
    `;
    const params: any[] = [path, method];
    if (statusCode) {
      query += ` AND er.status_code = $3`;
      params.push(statusCode);
    } else {
      query += ` ORDER BY er.is_default DESC, er.status_code ASC`;
    }
    query += ` LIMIT 1`;

    const result = await this.pool.query(query, params);

    if (result.rows.length === 0) {
      return null;
    }

    const rawSchema: unknown = result.rows[0].schema;
    return {
      schema: (typeof rawSchema === 'object' && rawSchema !== null && !Array.isArray(rawSchema)) 
        ? (rawSchema as Record<string, unknown>) 
        : null,
      userId: result.rows[0].user_id,
      count: typeof result.rows[0].mock_count === 'number' ? result.rows[0].mock_count : 5,
      statusCode: result.rows[0].status_code || 200,
    };
  }

  async save(
    userId: string,
    requestSchemaId: string | null,
    path: string,
    method: string,
    count: number,
    responses: Array<{ statusCode: number; schemaId: string }>,
  ): Promise<Record<string, unknown>> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const query = `
        INSERT INTO endpoints (user_id, request_schema_id, path, method, mock_count)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (path, method) 
        DO UPDATE SET request_schema_id = EXCLUDED.request_schema_id, user_id = EXCLUDED.user_id, mock_count = EXCLUDED.mock_count
        RETURNING id, request_schema_id as "requestSchemaId", path, method, mock_count as "count", created_at as "createdAt"
      `;
      const res = await client.query(query, [userId, requestSchemaId, path, method, count]);
      const endpoint = res.rows[0];

      await client.query(`DELETE FROM endpoint_responses WHERE endpoint_id = $1`, [endpoint.id]);
      
      const responseRecords: Array<{ statusCode: number; schemaId: string }> = [];
      let hasDefault = false;
      for (const [index, r] of responses.entries()) {
        const isDefault = r.statusCode === 200 || (!hasDefault && index === responses.length - 1);
        if (isDefault) hasDefault = true;
        
        await client.query(`
          INSERT INTO endpoint_responses (endpoint_id, schema_id, status_code, is_default)
          VALUES ($1, $2, $3, $4)
        `, [endpoint.id, r.schemaId, r.statusCode, isDefault]);
        
        responseRecords.push({ statusCode: r.statusCode, schemaId: r.schemaId });
      }
      
      await client.query('COMMIT');
      endpoint.responses = responseRecords;
      return endpoint;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  async findAllEndpoints(userId: string): Promise<Record<string, unknown>[]> {
    const query = `
      SELECT e.id, e.path, e.method, e.request_schema_id as "requestSchemaId", e.mock_count as "count", e.created_at as "createdAt"
      FROM endpoints e
      WHERE e.user_id = $1
      ORDER BY e.created_at DESC
    `;
    const result = await this.pool.query(query, [userId]);
    const endpoints = result.rows;
    
    if (endpoints.length > 0) {
      const endpointIds = endpoints.map(e => e.id);
      const responsesQuery = `
        SELECT er.endpoint_id, er.status_code as "statusCode", er.schema_id as "schemaId", s.name as "schemaName"
        FROM endpoint_responses er
        LEFT JOIN schemas s ON er.schema_id = s.id
        WHERE er.endpoint_id = ANY($1)
        ORDER BY er.status_code ASC
      `;
      const responsesResult = await this.pool.query(responsesQuery, [endpointIds]);
      
      for (const endpoint of endpoints) {
        endpoint.responses = responsesResult.rows
          .filter(r => r.endpoint_id === endpoint.id)
          .map(r => ({ statusCode: r.statusCode, schemaId: r.schemaId, schemaName: r.schemaName }));
      }
    }
    
    return endpoints;
  }

  async findEndpointById(
    id: string,
    userId: string,
  ): Promise<Record<string, unknown> | null> {
    const query = `
      SELECT id, path, method, request_schema_id as "requestSchemaId", mock_count as "count", created_at as "createdAt"
      FROM endpoints 
      WHERE id = $1 AND user_id = $2
      LIMIT 1
    `;
    const result = await this.pool.query(query, [id, userId]);
    if (result.rows.length === 0) return null;
    
    const endpoint = result.rows[0];
    
    const responsesQuery = `
      SELECT er.status_code as "statusCode", er.schema_id as "schemaId", s.name as "schemaName"
      FROM endpoint_responses er
      LEFT JOIN schemas s ON er.schema_id = s.id
      WHERE er.endpoint_id = $1
      ORDER BY er.status_code ASC
    `;
    const responsesResult = await this.pool.query(responsesQuery, [id]);
    endpoint.responses = responsesResult.rows;
    
    return endpoint;
  }

  async updateEndpoint(
    id: string,
    userId: string,
    requestSchemaId: string | null,
    path: string,
    method: string,
    count: number,
    responses: Array<{ statusCode: number; schemaId: string }>,
  ): Promise<Record<string, unknown>> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      const query = `
        UPDATE endpoints 
        SET path = $1, method = $2, request_schema_id = $3, mock_count = $4
        WHERE id = $5 AND user_id = $6
        RETURNING id, path, method, request_schema_id as "requestSchemaId", mock_count as "count", created_at as "createdAt"
      `;
      const res = await client.query(query, [path, method, requestSchemaId, count, id, userId]);
      if (res.rows.length === 0) {
        throw new Error('Endpoint not found or unauthorized');
      }
      const endpoint = res.rows[0];

      await client.query(`DELETE FROM endpoint_responses WHERE endpoint_id = $1`, [id]);
      
      const responseRecords: Array<{ statusCode: number; schemaId: string }> = [];
      let hasDefault = false;
      for (const [index, r] of responses.entries()) {
        const isDefault = r.statusCode === 200 || (!hasDefault && index === responses.length - 1);
        if (isDefault) hasDefault = true;
        
        await client.query(`
          INSERT INTO endpoint_responses (endpoint_id, schema_id, status_code, is_default)
          VALUES ($1, $2, $3, $4)
        `, [id, r.schemaId, r.statusCode, isDefault]);
        
        responseRecords.push({ statusCode: r.statusCode, schemaId: r.schemaId });
      }

      await client.query('COMMIT');
      endpoint.responses = responseRecords;
      return endpoint;
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
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
