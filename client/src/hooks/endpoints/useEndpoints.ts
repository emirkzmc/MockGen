import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi, CreateEndpointPayload } from '@/api';
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

export function useCreateEndpoint() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mockApi.createEndpoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: endpointKeys.lists() });
    },
  });
}

export function useUpdateEndpoint() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateEndpointPayload }) =>
      mockApi.updateEndpoint(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: endpointKeys.lists() });
      queryClient.invalidateQueries({ queryKey: endpointKeys.detail(variables.id) });
    },
  });
}

export function useDeleteEndpoint() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: mockApi.deleteEndpoint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: endpointKeys.lists() });
    },
  });
}

export function useGetLogs() {
  return useQuery({
    queryKey: endpointKeys.logs(),
    queryFn: mockApi.getLogs,
  });
}
