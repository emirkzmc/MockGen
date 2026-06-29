export const endpointKeys = {
  all: ['endpoints'] as const,
  lists: () => [...endpointKeys.all, 'list'] as const,
  list: (filters: string) => [...endpointKeys.lists(), { filters }] as const,
  details: () => [...endpointKeys.all, 'detail'] as const,
  detail: (id: string) => [...endpointKeys.details(), id] as const,
  logs: () => [...endpointKeys.all, 'logs'] as const,
};
