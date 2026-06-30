export interface SchemaData {
  id: string;
  name: string;
  schema: Record<string, unknown>;
  createdAt: string;
}

export interface CreateSchemaPayload {
  name: string;
  schema: Record<string, unknown>;
}

export interface SchemaField {
  id: string;
  name: string;
  type: "id" | "string" | "number" | "boolean" | "uuid" | "date" | "object" | "array" | "email" | "name" | "firstName" | "lastName" | "age" | "isActive" | "city" | "phone" | string;
  subFields?: SchemaField[];
  itemType?: string | Record<string, unknown>;
  schema?: Record<string, unknown>;
}

export interface SchemaSearchParams extends Record<string, any> {
  search?: string;
}

export type SchemaSearchListResponse = SchemaData[];
export type SchemaSearchResponse = SchemaData;
