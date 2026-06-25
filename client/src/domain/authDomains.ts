export interface LoginRequest {
  email?: string;
  password?: string;
}

export interface RegisterRequest {
  fullName?: string;
  email?: string;
  password?: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface RegisterResponse {
  id: string;
  email: string;
}
