import apiClient from '../lib/apiClient';
import { LogApiMethod } from '../constants/MethodNames';
import { buildSearchPath } from '../helpers/buildSearchPath';
import type {
  LogSearchParams,
  LogSearchListResponse,
} from '../domain/logDomains';

export const getLogs = async (params?: Record<string, unknown>): Promise<LogSearchListResponse> => {
  const response = await apiClient.get<LogSearchListResponse>(
    buildSearchPath(LogApiMethod.SEARCH, params),
  );
  return response.data;
}
