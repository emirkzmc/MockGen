export const queryKeys = {
  endpoints: {
    all: ['endpoints'] as const,
    list: () => [...queryKeys.endpoints.all, 'list'] as const,
    detail: (id: string | null) => [...queryKeys.endpoints.all, 'detail', id] as const,
  },
  schemas: {
    all: ['schemas'] as const,
    list: () => [...queryKeys.schemas.all, 'list'] as const,
    detail: (id: string | null) => [...queryKeys.schemas.all, 'detail', id] as const,
  },
  logs: {
    all: ['logs'] as const,
    list: () => [...queryKeys.logs.all, 'list'] as const,
  },
  preview: {
    all: ['preview'] as const,
    detail: (fields: unknown, count: number) => [...queryKeys.preview.all, fields, count] as const,
  },
} as const;
