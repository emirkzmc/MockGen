export const AUTH_KEYS = {
  all: ['auth'] as const,
  user: () => [...AUTH_KEYS.all, 'user'] as const,
};

export const ENDPOINT_KEYS = {
  all: ['endpoints'] as const,
  lists: () => [...ENDPOINT_KEYS.all, 'list'] as const,
  list: (filters: string) => [...ENDPOINT_KEYS.lists(), { filters }] as const,
  details: () => [...ENDPOINT_KEYS.all, 'detail'] as const,
  detail: (id: string) => [...ENDPOINT_KEYS.details(), id] as const,
};
