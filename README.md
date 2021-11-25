# poc-typescript-nestjs-graphql

## Requirements

- [NodeJS](https://nodejs.org/en/)
- MongoDB database

## Getting started

### Installing dependencies

First, you need to install all the needed dependencies.

```bash
$ yarn
```

### Configuring the database

Before starting the application, you will need to create a MongoDB database and edit the connection string in the `app.modules.ts` file to match your database configuration. The repository includes a Docker-Compose file that helps you start MongoDB.

```
docker-compose up -d mongodb
```

The default database configuration in the `app.module.ts` file looks like this:

```
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest')],
})
```

If you are not running the database on your local machine, replace localhost with the correct IP-Address.

### Starting the application

After installing the dependencies, you can run the application using one of the following commands.

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Testing the application

After starting the application you can start using it by either opening the GraphQL playground on http://localhost:3000/graphql or sending a request through an HTTP client like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/).

### Creating an task

```
mutation {
  createTask(input: {title: "task", finished: false, description: "test"}) {
    title
    finished
    description
    id
  }
}
```

### Getting all tasks

```
{
  tasks {
    title,
    finished,
    description,
    id
  }
}
```

### Updating task

```
mutation {
  updateTask(id: "ID", input: {title: "task123", finished: false, description: "test123"}) {
    title
    finished
    description
    id
  }
}
```

### Deleting task

```
mutation {
  deleteTask(id: "ID") {
    title
    finished
    description
    id
  }
}
```
