import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Inject } from '@nestjs/common';
import type { IStorage } from '../core/contracts/storage.interface';
import { STORAGE_TOKEN } from '../core/contracts/storage.interface';
import type { Request as ExpressRequest } from 'express';

@Controller('schemas')
export class SchemaController {
  constructor(@Inject(STORAGE_TOKEN) private readonly storage: IStorage) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getSchemas(
    @Request() req: ExpressRequest & { user?: Record<string, unknown> },
  ): Promise<Record<string, unknown>[]> {
    const user = req.user ?? {};
    const userId = typeof user.userId === 'string' ? user.userId : '';
    return this.storage.findAllSchemas(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getSchema(
    @Param('id') id: string,
    @Request() req: ExpressRequest & { user?: Record<string, unknown> },
  ): Promise<Record<string, unknown>> {
    const user = req.user ?? {};
    const userId = typeof user.userId === 'string' ? user.userId : '';
    const schema = await this.storage.findSchemaById(id, userId);
    if (!schema) {
      throw new NotFoundException('Schema not found');
    }
    return schema;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSchema(
    @Request() req: ExpressRequest & { user?: Record<string, unknown> },
    @Body() body: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const user = req.user ?? {};
    const userId = typeof user.userId === 'string' ? user.userId : '';
    const name = typeof body.name === 'string' ? body.name : '';
    const schema = typeof body.schema === 'object' && body.schema !== null ? (body.schema as Record<string, unknown>) : {};

    return this.storage.createSchema(userId, name, schema);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateSchema(
    @Param('id') id: string,
    @Request() req: ExpressRequest & { user?: Record<string, unknown> },
    @Body() body: Record<string, unknown>,
  ): Promise<Record<string, unknown>> {
    const user = req.user ?? {};
    const userId = typeof user.userId === 'string' ? user.userId : '';
    const name = typeof body.name === 'string' ? body.name : '';
    const schema = typeof body.schema === 'object' && body.schema !== null ? (body.schema as Record<string, unknown>) : {};

    return this.storage.updateSchema(id, userId, name, schema);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteSchema(
    @Param('id') id: string,
    @Request() req: ExpressRequest & { user?: Record<string, unknown> },
  ): Promise<{ success: boolean }> {
    const user = req.user ?? {};
    const userId = typeof user.userId === 'string' ? user.userId : '';
    await this.storage.deleteSchema(id, userId);
    return { success: true };
  }
}
