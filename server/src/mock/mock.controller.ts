import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Inject } from '@nestjs/common';
import type { IStorage } from '../core/contracts/storage.interface';
import { STORAGE_TOKEN } from '../core/contracts/storage.interface';
import type { Request as ExpressRequest } from 'express';
import { faker } from '@faker-js/faker';

@Controller('mock')
export class MockController {
  constructor(@Inject(STORAGE_TOKEN) private readonly storage: IStorage) {}

  @Post('generate')
  generatePreview(
    @Body() schema: Record<string, unknown>,
  ): Record<string, unknown> {
    return this.generateFromSchema(schema);
  }

  @UseGuards(JwtAuthGuard)
  @Post('endpoints')
  async saveEndpoint(
    @Request() req: ExpressRequest & { user?: Record<string, unknown> },
    @Body() body: Record<string, unknown>,
  ): Promise<void> {
    const user = req.user ?? {};
    const userId = typeof user.userId === 'string' ? user.userId : '';
    const path = typeof body.path === 'string' ? body.path : '';
    const method = typeof body.method === 'string' ? body.method : '';
    const schema =
      typeof body.schema === 'object' && body.schema !== null
        ? (body.schema as Record<string, unknown>)
        : {};

    await this.storage.save(userId, path, method, schema);
  }

  private generateFromSchema(
    schema: Record<string, unknown>,
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const key of Object.keys(schema)) {
      const type = schema[key];
      if (type === 'string') {
        result[key] = faker.lorem.word();
      } else if (type === 'number') {
        result[key] = faker.number.int();
      } else if (type === 'boolean') {
        result[key] = faker.datatype.boolean();
      } else if (type === 'uuid') {
        result[key] = faker.string.uuid();
      } else if (type === 'email') {
        result[key] = faker.internet.email();
      } else if (type === 'name') {
        result[key] = faker.person.fullName();
      } else {
        result[key] = faker.lorem.word();
      }
    }
    return result;
  }
}
