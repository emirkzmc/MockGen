import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
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
    @Body() body: Record<string, unknown>,
  ): Record<string, unknown> {
    const schema =
      typeof body.schema === 'object' && body.schema !== null
        ? (body.schema as Record<string, unknown>)
        : {};
    const count = typeof body.count === 'number' ? body.count : 1;

    return this.generateFromSchema(schema, count);
  }

  @UseGuards(JwtAuthGuard)
  @Get('endpoints/search')
  async getEndpoints(
    @Request() req: ExpressRequest & { user?: Record<string, unknown> },
  ): Promise<Record<string, unknown>[]> {
    const user = req.user ?? {};
    const userId = typeof user.userId === 'string' ? user.userId : '';
    return this.storage.findAllEndpoints(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('endpoints/:id')
  async getEndpoint(
    @Param('id') id: string,
    @Request() req: ExpressRequest & { user?: Record<string, unknown> },
  ): Promise<Record<string, unknown>> {
    const user = req.user ?? {};
    const userId = typeof user.userId === 'string' ? user.userId : '';
    const endpoint = await this.storage.findEndpointById(id, userId);
    if (!endpoint) {
      throw new NotFoundException('Endpoint not found');
    }
    return endpoint;
  }

  @UseGuards(JwtAuthGuard)
  @Post('endpoints/create')
  async saveEndpoint(
    @Request() req: ExpressRequest & { user?: Record<string, unknown> },
    @Body() body: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const user = req.user ?? {};
    const userId = typeof user.userId === 'string' ? user.userId : '';
    const path = typeof body.path === 'string' ? body.path : '';
    const method = typeof body.method === 'string' ? body.method : '';
    const count = typeof body.count === 'number' ? body.count : 5;
    const requestSchemaId =
      typeof body.requestSchemaId === 'string' ? body.requestSchemaId : null;
    const responses = Array.isArray(body.responses) ? body.responses : [];

    return this.storage.save(
      userId,
      requestSchemaId,
      path,
      method,
      count,
      responses as Array<{ statusCode: number; schemaId: string }>,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('endpoints/update/:id')
  async updateEndpoint(
    @Param('id') id: string,
    @Request() req: ExpressRequest & { user?: Record<string, unknown> },
    @Body() body: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const user = req.user ?? {};
    const userId = typeof user.userId === 'string' ? user.userId : '';
    const path = typeof body.path === 'string' ? body.path : '';
    const method = typeof body.method === 'string' ? body.method : '';
    const count = typeof body.count === 'number' ? body.count : 5;
    const requestSchemaId =
      typeof body.requestSchemaId === 'string' ? body.requestSchemaId : null;
    const responses = Array.isArray(body.responses) ? body.responses : [];

    return this.storage.updateEndpoint(
      id,
      userId,
      requestSchemaId,
      path,
      method,
      count,
      responses as Array<{ statusCode: number; schemaId: string }>,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('endpoints/delete/:id')
  async deleteEndpoint(
    @Param('id') id: string,
    @Request() req: ExpressRequest & { user?: Record<string, unknown> },
  ): Promise<{ success: boolean }> {
    const user = req.user ?? {};
    const userId = typeof user.userId === 'string' ? user.userId : '';
    await this.storage.deleteEndpoint(id, userId);
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('logs/search')
  async getLogs(
    @Request() req: ExpressRequest & { user?: Record<string, unknown> },
  ): Promise<Record<string, unknown>[]> {
    const user = req.user ?? {};
    const userId = typeof user.userId === 'string' ? user.userId : '';
    return this.storage.getLogs(userId);
  }

  private generateFromSchema(
    schema: Record<string, unknown>,
    count: number,
    index?: number,
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {};
    const keys = Array.isArray(schema._meta_order)
      ? (schema._meta_order as string[])
      : Object.keys(schema).filter((k) => k !== '_meta_order');

    for (const key of keys) {
      if (key === '_meta_order') continue;
      const value = schema[key];
      if (
        typeof value === 'object' &&
        value !== null &&
        (value as Record<string, unknown>).type === 'array'
      ) {
        const itemType = (value as Record<string, unknown>).itemType;
        const subSchema =
          typeof itemType === 'object' && itemType !== null
            ? (itemType as Record<string, unknown>)
            : {};
        result[key] = Array.from({ length: count }, (_, i) =>
          this.generateFromSchema(subSchema, count, i),
        );
      } else if (value === 'id') {
        result[key] = (index ?? 0) + 1;
      } else if (typeof value === 'string') {
        result[key] = this.generateValue(value);
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  private generateValue(type: string): unknown {
    switch (type) {
      case 'string':
        return faker.lorem.word();
      case 'number':
        return faker.number.int();
      case 'boolean':
        return faker.datatype.boolean();
      case 'uuid':
        return faker.string.uuid();
      case 'email':
        return faker.internet.email();
      case 'firstName':
        return faker.person.firstName();
      case 'lastName':
        return faker.person.lastName();
      case 'age':
        return faker.number.int({ min: 18, max: 65 });
      case 'name':
        return faker.person.fullName();
      case 'city':
        return faker.location.city();
      case 'phone':
        return faker.phone.number();
      case 'date':
        return faker.date.recent().toISOString();
      default:
        return faker.lorem.word();
    }
  }
}
