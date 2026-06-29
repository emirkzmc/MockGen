import { apiClient } from './client';
import { AuthApiMethod } from '../constants/MethodNames';
import type { LoginRequest, AuthResponse, RegisterRequest, RegisterResponse } from '../domain/authDomains';

export async function loginUser(payload: LoginRequest): Promise<AuthResponse> {
  return apiClient.post<AuthResponse>(AuthApiMethod.LOGIN, payload);
}

export async function registerUser(payload: RegisterRequest): Promise<RegisterResponse> {
  return apiClient.post<RegisterResponse>(AuthApiMethod.REGISTER, payload);
}
