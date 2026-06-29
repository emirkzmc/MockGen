import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { loginUser, registerUser } from '../../api/authApi';
import type { LoginRequest, AuthResponse, RegisterRequest, RegisterResponse } from '../../domain/authDomains';

export function useLoginMutation(): UseMutationResult<AuthResponse, Error, LoginRequest> {
  return useMutation({
    mutationFn: (payload: LoginRequest) => loginUser(payload),
  });
}

export function useRegisterMutation(): UseMutationResult<RegisterResponse, Error, RegisterRequest> {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => registerUser(payload),
  });
}
