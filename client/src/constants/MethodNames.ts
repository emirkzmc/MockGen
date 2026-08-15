export enum AuthApiMethod {
  LOGIN = '/auth/login',
  REGISTER = '/auth/register',
}

export enum SchemaApiMethod {
  SEARCH = '/schemas/search',
  DETAIL = '/schemas',
  CREATE = '/schemas/create',
  UPDATE = '/schemas/update',
  DELETE = '/schemas/delete',
}

export enum EndpointApiMethod {
  SEARCH = '/mock/endpoints/search',
  DETAIL = '/mock/endpoints',
  CREATE = '/mock/endpoints/create',
  UPDATE = '/mock/endpoints/update',
  DELETE = '/mock/endpoints/delete',
}

export enum LogApiMethod {
  SEARCH = '/mock/logs/search',
  CREATE = '/mock/logs/create',
  DELETE = '/mock/logs/delete',
}
