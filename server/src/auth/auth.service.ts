import {
  Injectable,
  Inject,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { Pool } from 'pg';

interface UserRow {
  id: string | number;
  email: string;
  password?: string;
  full_name?: string | null;
}
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PG_POOL_TOKEN } from '../core/contracts/storage.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PG_POOL_TOKEN) private readonly pool: Pool,
    private jwtService: JwtService,
  ) {}

  async register(
    email: unknown,
    password: unknown,
    fullName?: unknown,
  ): Promise<Record<string, unknown>> {
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new ConflictException();
    }

    const nameToSave = typeof fullName === 'string' ? fullName : null;

    const checkQuery = `SELECT id FROM users WHERE email = $1 LIMIT 1`;
    const checkResult = await this.pool.query<UserRow>(checkQuery, [email]);

    if (checkResult.rows.length > 0) {
      throw new ConflictException();
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const insertQuery = `
      INSERT INTO users (email, password, full_name)
      VALUES ($1, $2, $3)
      RETURNING id, email, full_name
    `;
    const result = await this.pool.query<UserRow>(insertQuery, [
      email,
      hashedPassword,
      nameToSave,
    ]);
    const user = result.rows[0];

    return user as unknown as Record<string, unknown>;
  }

  async login(
    email: unknown,
    password: unknown,
  ): Promise<Record<string, unknown>> {
    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new UnauthorizedException();
    }

    const query = `SELECT id, password, full_name FROM users WHERE email = $1 LIMIT 1`;
    const result = await this.pool.query<UserRow>(query, [email]);

    if (result.rows.length === 0) {
      throw new UnauthorizedException();
    }

    const user = result.rows[0];
    const passwordRaw: unknown = user.password;

    if (typeof passwordRaw !== 'string') {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(password, passwordRaw);
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const userIdRaw: unknown = user.id;
    if (typeof userIdRaw !== 'string' && typeof userIdRaw !== 'number') {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: userIdRaw,
      email,
      fullName: user.full_name || email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
