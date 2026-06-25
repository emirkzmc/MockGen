import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

class ApiClient {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
      timeout: 10000,
    });

    this.client.interceptors.request.use(this.handleRequest);
    this.client.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  private handleRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  };

  private handleSuccess = (response: AxiosResponse): AxiosResponse => {
    return response;
  };

  private handleError = (error: unknown): Promise<never> => {
    return Promise.reject(error);
  };

  public async get<T>(url: string, config?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: unknown, config?: Record<string, unknown>): Promise<T> {
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: Record<string, unknown>): Promise<T> {
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();
