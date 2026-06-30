import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createSchema, updateSchema, deleteSchema } from '@/api';
import type { CreateSchemaPayload } from '@/domain/schemaDomains';
import { queryKeys } from '@/constants/queryKeys';

function useInvalidateSchemaQueries() {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.schemas.all });
  };
}

export function useCreateSchemaMutation() {
  const invalidate = useInvalidateSchemaQueries();

  return useMutation({
    mutationFn: (payload: CreateSchemaPayload) => createSchema(payload),
    onSuccess: () => {
      toast.success('Schema created successfully');
      invalidate();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to create schema');
    },
  });
}

export function useUpdateSchemaMutation() {
  const invalidate = useInvalidateSchemaQueries();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CreateSchemaPayload }) =>
      updateSchema(id, payload),
    onSuccess: (_, variables) => {
      toast.success('Schema updated successfully');
      invalidate();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update schema');
    },
  });
}

export function useDeleteSchemaMutation() {
  const invalidate = useInvalidateSchemaQueries();

  return useMutation({
    mutationFn: deleteSchema,
    onSuccess: () => {
      toast.success('Schema deleted successfully');
      invalidate();
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete schema');
    },
  });
}
