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

    const endpointResult = await this.storage.findByPathAndMethod(req.path, req.method);

    if (!endpointResult) {
      next();
      return;
    }

    const { schema, userId } = endpointResult;

    // Log the request
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

    const generatedData = this.generateFromSchema(schema);
    res.status(200).json(generatedData);
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
