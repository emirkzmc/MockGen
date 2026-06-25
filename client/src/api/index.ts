import apiClient from './apiClient';

export interface EndpointData {
  id: string;
  method: string;
  path: string;
  count: number;
  schema: Record<string, unknown>;
  createdAt: string;
}

export interface CreateEndpointPayload {
  method: string;
  path: string;
  schema: Record<string, unknown>;
  count: number;
}

export const mockApi = {
  getEndpoints: () => 
    apiClient.get<EndpointData[]>('/mock/endpoints').then((res) => res.data),
    
  getEndpointById: (id: string) => 
    apiClient.get<EndpointData>(`/mock/endpoints/${id}`).then((res) => res.data),

  createEndpoint: (payload: CreateEndpointPayload) => 
    apiClient.post<EndpointData>('/mock/endpoints', payload).then((res) => res.data),

  updateEndpoint: (id: string, payload: CreateEndpointPayload) => 
    apiClient.put<EndpointData>(`/mock/endpoints/${id}`, payload).then((res) => res.data),

  deleteEndpoint: (id: string) => 
    apiClient.delete(`/mock/endpoints/${id}`).then((res) => res.data),

  getLogs: () => 
    apiClient.get<Record<string, unknown>[]>('/mock/logs').then((res) => res.data),
};
