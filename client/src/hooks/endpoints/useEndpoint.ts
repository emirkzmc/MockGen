import { useQuery } from '@tanstack/react-query';
import { getEndpoints, getEndpointById } from '@/api/endpointApi';
import { getLogs } from '@/api/logApi';
import { queryKeys } from '@/constants/queryKeys';

export function useGetEndpoints() {
  return useQuery({
    queryKey: queryKeys.endpoints.list(),
    queryFn: () => getEndpoints(),
  });
}

export function useGetEndpoint(id: string | null) {
  return useQuery({
    queryKey: queryKeys.endpoints.detail(id ?? ''),
    queryFn: () => getEndpointById(id!),
    enabled: !!id,
  });
}

export function useGetLogs() {
  return useQuery({
    queryKey: queryKeys.logs.list(),
    queryFn: () => getLogs(),
  });
}
