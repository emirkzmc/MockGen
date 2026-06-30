export const STORAGE_TOKEN = Symbol('STORAGE_TOKEN');
export const PG_POOL_TOKEN = Symbol('PG_POOL_TOKEN');

export interface IStorage {
  // --- Schemas ---
  createSchema(
    userId: string,
    name: string,
    schema: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
  findAllSchemas(userId: string): Promise<Record<string, unknown>[]>;
  findSchemaById(id: string, userId: string): Promise<Record<string, unknown> | null>;
  updateSchema(
    id: string,
    userId: string,
    name: string,
    schema: Record<string, unknown>,
  ): Promise<Record<string, unknown>>;
  deleteSchema(id: string, userId: string): Promise<void>;

  // --- Endpoints ---
  findByPathAndMethod(
    path: string,
    method: string,
  ): Promise<{ schema: Record<string, unknown>; userId: string; count: number } | null>;
  save(
    userId: string,
    schemaId: string,
    path: string,
    method: string,
    count: number,
  ): Promise<Record<string, unknown>>;
  findAllEndpoints(userId: string): Promise<Record<string, unknown>[]>;
  findEndpointById(
    id: string,
    userId: string,
  ): Promise<Record<string, unknown> | null>;
  updateEndpoint(
    id: string,
    userId: string,
    schemaId: string,
    path: string,
    method: string,
    count: number,
  ): Promise<Record<string, unknown>>;
  deleteEndpoint(id: string, userId: string): Promise<void>;
  getLogs(userId: string): Promise<Record<string, unknown>[]>;
  saveLog(
    userId: string,
    method: string,
    path: string,
    headers: Record<string, unknown>,
    body: Record<string, unknown> | null,
  ): Promise<void>;
}
