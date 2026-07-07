import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';
import type { IStorage } from '../core/contracts/storage.interface';
import { STORAGE_TOKEN } from '../core/contracts/storage.interface';
import { faker } from '@faker-js/faker';

@Injectable()
export class MockMiddleware implements NestMiddleware {
  constructor(@Inject(STORAGE_TOKEN) private readonly storage: IStorage) {}

  async use(req: Request, res: Response, next: NextFunction): Promise<void> {
    if (req.path.startsWith('/mock') || req.path.startsWith('/auth')) {
      next();
      return;
    }

    const reqStatusHeader = req.headers['x-mock-status'];
    let requestedStatusCode: number | undefined = undefined;
    
    if (typeof reqStatusHeader === 'string') {
      const parsed = parseInt(reqStatusHeader, 10);
      if (!isNaN(parsed)) {
        requestedStatusCode = parsed;
      }
    }

    const endpointResult = await this.storage.findByPathAndMethod(req.path, req.method, requestedStatusCode);

    if (!endpointResult) {
      next();
      return;
    }

    const { schema, userId, statusCode } = endpointResult;

    try {
      await this.storage.saveLog(
        userId,
        req.method,
        req.path,
        req.headers as Record<string, unknown>,
        Object.keys(req.body || {}).length > 0 ? (req.body as Record<string, unknown>) : null
      );
    } catch (err) {
      console.error('Failed to save log', err);
    }

    const count = typeof endpointResult.count === 'number' ? endpointResult.count : 5;
    
    const response = schema ? this.generateMockData(schema, count) : {};

    res.status(statusCode).json(response);
  }

  private generateMockData(
    schema: Record<string, unknown>,
    count: number,
    index?: number,
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(schema)) {
      if (typeof value === 'object' && value !== null && (value as Record<string, unknown>).type === 'array') {
        const itemType = (value as Record<string, unknown>).itemType;
        const subSchema = typeof itemType === 'object' && itemType !== null ? itemType as Record<string, unknown> : {};
        result[key] = Array.from({ length: count }, (_, i) => this.generateMockData(subSchema, count, i));
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
      case 'string': return faker.lorem.word();
      case 'number': return faker.number.int();
      case 'boolean': return faker.datatype.boolean();
      case 'uuid': return faker.string.uuid();
      case 'email': return faker.internet.email();
      case 'firstName': return faker.person.firstName();
      case 'lastName': return faker.person.lastName();
      case 'age': return faker.number.int({ min: 18, max: 65 });
      case 'isActive': return faker.datatype.boolean();
      case 'name': return faker.person.fullName();
      case 'city': return faker.location.city();
      case 'phone': return faker.phone.number();
      case 'date': return faker.date.recent().toISOString();
      default: return faker.lorem.word();
    }
  }
}
