export function buildSearchPath(base: string, params?: Record<string, any>): string {
  if (!params) return base;
  
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `${base}?${queryString}` : base;
}
