import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TasksModule } from '../src/task/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

describe('TasksController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TasksModule,
        MongooseModule.forRoot('mongodb://localhost/nestgraphqltesting'),
        GraphQLModule.forRoot({
          autoSchemaFile: 'schema.gql',
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const task = {
    title: 'Great task',
    finished: false,
    description: 'Description of this great task',
  };

  let id: string = '';

  const updatedTask = {
    title: 'Great updated task',
    finished: false,
    description: 'Updated description of this great task',
  };

  const createTaskObject = JSON.stringify(task).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  const createTaskQuery = `
  mutation {
    createTask(input: ${createTaskObject}) {
      title
      finished
      description
      id
    }
  }`;

  it('createTask', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: createTaskQuery,
      })
      .expect(({ body }) => {
        const data = body.data.createTask;
        id = data.id;
        expect(data.title).toBe(task.title);
        expect(data.description).toBe(task.description);
        expect(data.finished).toBe(task.finished);
      })
      .expect(200);
  });

  it('getTasks', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: '{tasks{title, finished, description, id}}',
      })
      .expect(({ body }) => {
        const data = body.data.tasks;
        const taskResult = data[0];
        expect(data.length).toBeGreaterThan(0);
        expect(taskResult.title).toBe(task.title);
        expect(taskResult.description).toBe(task.description);
        expect(taskResult.finished).toBe(task.finished);
      })
      .expect(200);
  });

  const updateTaskObject = JSON.stringify(updatedTask).replace(
    /\"([^(\")"]+)\":/g,
    '$1:',
  );

  it('updateTask', () => {
    const updateTaskQuery = `
    mutation {
      updateTask(id: "${id}", input: ${updateTaskObject}) {
        title
        finished
        description
        id
      }
    }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: updateTaskQuery,
      })
      .expect(({ body }) => {
        const data = body.data.updatedTask;
        expect(data.title).toBe(updatedTask.title);
        expect(data.description).toBe(updatedTask.description);
        expect(data.finished).toBe(updatedTask.finished);
      })
      .expect(200);
  });

  it('deleteTask', () => {
    const deleteTaskQuery = `
      mutation {
        deleteTask(id: "${id}") {
          title
          finished
          description
          id
        }
      }`;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        operationName: null,
        query: deleteTaskQuery,
      })
      .expect(({ body }) => {
        const data = body.data.deleteTask;
        expect(data.title).toBe(updatedTask.title);
        expect(data.description).toBe(updatedTask.description);
        expect(data.finished).toBe(updatedTask.finished);
      })
      .expect(200);
  });
});
