import apiClient from '../lib/apiClient';
import { EndpointApiMethod } from '../constants/MethodNames';
import { buildSearchPath } from '../helpers/buildSearchPath';
import type {
  EndpointSearchParams,
  EndpointSearchListResponse,
  EndpointSearchResponse,
  CreateEndpointPayload,
} from '../domain/endpointDomains';

export async function getEndpoints(params?: EndpointSearchParams): Promise<EndpointSearchListResponse> {
  const response = await apiClient.get<EndpointSearchListResponse>(
    buildSearchPath(EndpointApiMethod.SEARCH, params as Record<string, any>),
  );
  return response.data;
}

export async function getEndpointById(id: string): Promise<EndpointSearchResponse> {
  const response = await apiClient.get<EndpointSearchResponse>(
    `${EndpointApiMethod.DETAIL}/${id}`
  );
  return response.data;
}

export async function createEndpoint(payload: CreateEndpointPayload): Promise<EndpointSearchResponse> {
  const response = await apiClient.post<EndpointSearchResponse>(
    EndpointApiMethod.CREATE,
    payload
  );
  return response.data;
}

export async function updateEndpoint(id: string, payload: CreateEndpointPayload): Promise<EndpointSearchResponse> {
  const response = await apiClient.put<EndpointSearchResponse>(
    `${EndpointApiMethod.UPDATE}/${id}`,
    payload
  );
  return response.data;
}

export async function deleteEndpoint(id: string): Promise<EndpointSearchResponse> {
  const response = await apiClient.delete<EndpointSearchResponse>(
    `${EndpointApiMethod.DELETE}/${id}`
  );
  return response.data;
}
