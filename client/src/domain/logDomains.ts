export interface LogData {
  id: string;
  method: string;
  path: string;
  headers: Record<string, unknown>;
  body: Record<string, unknown> | null;
  timestamp: string;
}

export interface LogSearchParams extends Record<string, any> {
  search?: string;
}

export type LogSearchListResponse = LogData[];
export type LogSearchResponse = LogData;
