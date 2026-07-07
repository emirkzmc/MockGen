export interface EndpointData {
  id: string;
  method: string;
  path: string;
  count: number;
  requestSchemaId?: string | null;
  responses: Array<{
    statusCode: number;
    schemaId: string;
    schemaName?: string;
  }>;
  createdAt: string;
}

export interface CreateEndpointPayload {
  method: string;
  path: string;
  requestSchemaId?: string | null;
  responses: Array<{
    statusCode: number;
    schemaId: string;
  }>;
  count: number;
}

export interface EndpointSearchParams extends Record<string, any> {
  search?: string;
}

export type EndpointSearchListResponse = EndpointData[];
export type EndpointSearchResponse = EndpointData;
