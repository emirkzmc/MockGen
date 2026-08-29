import { NextResponse } from 'next/server';
import { faker } from '@faker-js/faker';
import { SchemaField } from '@/domain/schemaDomains';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fields, count } = body as { fields: SchemaField[], count: number };

    if (!fields || !Array.isArray(fields)) {
      return NextResponse.json({ error: 'Invalid fields provided' }, { status: 400 });
    }

    const parsedCount = Math.max(1, Math.min(count || 1, 100));

    const generateItem = (fieldsList: SchemaField[], idx: number): Record<string, unknown> => {
      const item: Record<string, unknown> = {};
      
      fieldsList.forEach((field) => {
        if (!field.name.trim()) return;
        
        if (field.type === 'id') {
          item[field.name] = idx + 1;
        } else if (field.type === 'array') {
          const innerCount = 3; 
          item[field.name] = Array.from({ length: innerCount }, (_, i) => 
            generateItem(field.subFields || [], i)
          );
        } else {
          switch (field.type) {
            case 'string': item[field.name] = faker.lorem.word(); break;
            case 'number': item[field.name] = faker.number.int(); break;
            case 'boolean': item[field.name] = faker.datatype.boolean(); break;
            case 'uuid': item[field.name] = faker.string.uuid(); break;
            case 'email': item[field.name] = faker.internet.email(); break;
            case 'firstName': item[field.name] = faker.person.firstName(); break;
            case 'lastName': item[field.name] = faker.person.lastName(); break;
            case 'age': item[field.name] = faker.number.int({ min: 18, max: 65 }); break;
            case 'isActive': item[field.name] = faker.datatype.boolean(); break;
            case 'name': item[field.name] = faker.person.fullName(); break;
            case 'city': item[field.name] = faker.location.city(); break;
            case 'phone': item[field.name] = faker.phone.number(); break;
            case 'date': item[field.name] = faker.date.recent().toISOString(); break;
            case 'object': item[field.name] = { key: faker.lorem.word() }; break;
            default: item[field.name] = faker.lorem.word(); break;
          }
        }
      });
      
      return item;
    };

    const generatedData = Array.from({ length: parsedCount }, (_, i) => generateItem(fields, i));

    return NextResponse.json({
      total: parsedCount,
      data: generatedData
    });

  } catch (error) {
    console.error('Error generating preview:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}