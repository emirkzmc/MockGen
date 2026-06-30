import { useQuery } from '@tanstack/react-query';
import { getSchemas, getSchemaById } from '@/api';
import { queryKeys } from '@/constants/queryKeys';

export function useGetSchemas() {
  return useQuery({
    queryKey: queryKeys.schemas.list(),
    queryFn: getSchemas,
  });
}

export function useGetSchema(id: string | null) {
  return useQuery({
    queryKey: queryKeys.schemas.detail(id ?? ''),
    queryFn: () => getSchemaById(id!),
    enabled: !!id,
  });
}
