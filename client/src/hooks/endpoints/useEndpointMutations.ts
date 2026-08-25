import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createEndpoint, updateEndpoint, deleteEndpoint } from '@/api/endpointApi';
import type { CreateEndpointPayload } from '@/domain/endpointDomains';
import { queryKeys } from '@/constants/queryKeys';

function useInvalidateEndpointQueries() {
  const queryClient = useQueryClient();

  return async (endpointId?: string): Promise<void> => {
    await queryClient.invalidateQueries({ queryKey: queryKeys.endpoints.list() });

    if (endpointId) {
      await queryClient.invalidateQueries({ queryKey: queryKeys.endpoints.detail(endpointId) });
    }
  };
}

export function useCreateEndpointMutation() {
  const invalidateEndpoints = useInvalidateEndpointQueries();

  return useMutation({
    mutationFn: createEndpoint,
    onSuccess: async () => {
      await invalidateEndpoints();
      toast.success('Endpoint created successfully');
    },
    onError: () => {
      toast.error('An error occurred while creating the endpoint');
    },
  });
}

export function useUpdateEndpointMutation() {
  const invalidateEndpoints = useInvalidateEndpointQueries();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateEndpointPayload }) =>
      updateEndpoint(id, payload),
    onSuccess: async (_, variables) => {
      await invalidateEndpoints(variables.id);
      toast.success('Endpoint updated successfully');
    },
    onError: () => {
      toast.error('An error occurred while updating the endpoint');
    },
  });
}

export function useDeleteEndpointMutation() {
  const invalidateEndpoints = useInvalidateEndpointQueries();

  return useMutation({
    mutationFn: deleteEndpoint,
    onSuccess: async (_, id) => {
      await invalidateEndpoints(id);
      toast.success('Endpoint deleted successfully');
    },
    onError: () => {
      toast.error('An error occurred while deleting the endpoint');
    },
  });
}
