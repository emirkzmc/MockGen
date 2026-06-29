import { useQuery } from '@tanstack/react-query';
import { mockApi } from '@/api';
import { endpointKeys } from '../../lib/query/keys/endpointKeys';

export function useGetEndpoints() {
  return useQuery({
    queryKey: endpointKeys.lists(),
    queryFn: mockApi.getEndpoints,
  });
}

export function useGetEndpoint(id: string | null) {
  return useQuery({
    queryKey: endpointKeys.detail(id ?? ''),
    queryFn: () => mockApi.getEndpointById(id!),
    enabled: !!id,
  });
}

export function useGetLogs() {
  return useQuery({
    queryKey: endpointKeys.logs(),
    queryFn: mockApi.getLogs,
  });
}
