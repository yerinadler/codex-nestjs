import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('TodoController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/todos (POST)', () => {
    return request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'Test', description: 'Desc' })
      .expect(201)
      .then(({ body }) => {
        expect(body.title).toBe('Test');
        expect(body.status).toBe('PENDING');
      });
  });

  it('/todos (GET)', async () => {
    await request(app.getHttpServer())
      .post('/todos')
      .send({ title: 'Hello', description: 'World' });

    return request(app.getHttpServer())
      .get('/todos')
      .expect(200)
      .then(({ body }) => {
        expect(Array.isArray(body)).toBe(true);
        expect(body.length).toBe(1);
      });
  });
});
