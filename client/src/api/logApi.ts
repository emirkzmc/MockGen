import apiClient from './apiClient';
import { LogApiMethod } from '../constants/MethodNames';
import { buildSearchPath } from '../helpers/buildSearchPath';
import type {
  LogSearchParams,
  LogSearchListResponse,
} from '../domain/logDomains';

export async function getLogs(params?: LogSearchParams): Promise<LogSearchListResponse> {
  const response = await apiClient.get<LogSearchListResponse>(
    buildSearchPath(LogApiMethod.SEARCH, params as Record<string, any>),
  );
  return response.data;
}
