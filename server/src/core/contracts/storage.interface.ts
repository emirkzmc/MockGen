export const STORAGE_TOKEN = Symbol('STORAGE_TOKEN');
export const PG_POOL_TOKEN = Symbol('PG_POOL_TOKEN');

export interface IStorage {
  findByPathAndMethod(
    path: string,
    method: string,
  ): Promise<Record<string, unknown> | null>;
  save(
    userId: string,
    path: string,
    method: string,
    schema: Record<string, unknown>,
  ): Promise<void>;
}
