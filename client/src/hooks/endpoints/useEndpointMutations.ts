import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { mockApi, CreateEndpointPayload } from '@/api';
import { endpointKeys } from '../../lib/query/keys/endpointKeys';

function useInvalidateEndpointQueries() {
  const queryClient = useQueryClient();

  return async (endpointId?: string): Promise<void> => {
    await queryClient.invalidateQueries({ queryKey: endpointKeys.lists() });

    if (endpointId) {
      await queryClient.invalidateQueries({ queryKey: endpointKeys.detail(endpointId) });
    }
  };
}

export function useCreateEndpointMutation() {
  const invalidateEndpoints = useInvalidateEndpointQueries();

  return useMutation({
    mutationFn: mockApi.createEndpoint,
    onSuccess: async () => {
      await invalidateEndpoints();
      toast.success('Endpoint başarıyla oluşturuldu');
    },
    onError: () => {
      toast.error('Endpoint oluşturulurken bir hata oluştu');
    },
  });
}

export function useUpdateEndpointMutation() {
  const invalidateEndpoints = useInvalidateEndpointQueries();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateEndpointPayload }) =>
      mockApi.updateEndpoint(id, payload),
    onSuccess: async (_, variables) => {
      await invalidateEndpoints(variables.id);
      toast.success('Endpoint başarıyla güncellendi');
    },
    onError: () => {
      toast.error('Endpoint güncellenirken bir hata oluştu');
    },
  });
}

export function useDeleteEndpointMutation() {
  const invalidateEndpoints = useInvalidateEndpointQueries();

  return useMutation({
    mutationFn: mockApi.deleteEndpoint,
    onSuccess: async (_, id) => {
      await invalidateEndpoints(id);
      toast.success('Endpoint başarıyla silindi');
    },
    onError: () => {
      toast.error('Endpoint silinirken bir hata oluştu');
    },
  });
}
