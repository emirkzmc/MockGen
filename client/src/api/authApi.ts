import apiClient from '../lib/apiClient';
import { AuthApiMethod } from '../constants/MethodNames';
import type { LoginRequest, AuthResponse, RegisterRequest, RegisterResponse } from '../domain/authDomains';

export async function loginUser(payload: LoginRequest): Promise<AuthResponse> {
  const response = await apiClient.post<AuthResponse>(AuthApiMethod.LOGIN, payload);
  return response.data;
}

export async function registerUser(payload: RegisterRequest): Promise<RegisterResponse> {
  const response = await apiClient.post<RegisterResponse>(AuthApiMethod.REGISTER, payload);
  return response.data;
}
