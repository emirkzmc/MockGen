import apiClient from '../lib/apiClient';
import { SchemaApiMethod } from '../constants/MethodNames';
import { buildSearchPath } from '../helpers/buildSearchPath';
import type {
  SchemaSearchParams,
  SchemaSearchListResponse,
  SchemaSearchResponse,
  CreateSchemaPayload,
} from '../domain/schemaDomains';

export async function getSchemas(params?: Record<string, unknown>): Promise<SchemaSearchListResponse> {
  const response = await apiClient.get<SchemaSearchListResponse>(
    buildSearchPath(SchemaApiMethod.SEARCH, params),
  );
  return response.data;
}

export async function getSchemaById(id: string): Promise<SchemaSearchResponse> {
  const response = await apiClient.get<SchemaSearchResponse>(
    `${SchemaApiMethod.DETAIL}/${id}`
  );
  return response.data;
}

export async function createSchema(payload: CreateSchemaPayload): Promise<SchemaSearchResponse> {
  const response = await apiClient.post<SchemaSearchResponse>(
    SchemaApiMethod.CREATE,
    payload
  );
  return response.data;
}

export async function updateSchema(id: string, payload: CreateSchemaPayload): Promise<SchemaSearchResponse> {
  const response = await apiClient.put<SchemaSearchResponse>(
    `${SchemaApiMethod.UPDATE}/${id}`,
    payload
  );
  return response.data;
}

export async function deleteSchema(id: string): Promise<SchemaSearchResponse> {
  const response = await apiClient.delete<SchemaSearchResponse>(
    `${SchemaApiMethod.DELETE}/${id}`
  );
  return response.data;
}
