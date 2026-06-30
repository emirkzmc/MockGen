import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return this.authService.register(body.email, body.password, body.fullName);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() body: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    return this.authService.login(body.email, body.password);
  }
}
