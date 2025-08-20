import express from 'express';
import jsonGraphqlExpress, { getPlainSchema } from 'json-graphql-server/node';

const data = {
  users: [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 25 },
    { id: 3, name: 'Alice Johnson', age: 28 },
  ],
  posts: [
    { id: 1, title: 'GraphQL Basics', content: 'Introduction to GraphQL', authorId: 1 },
    { id: 2, title: 'Advanced GraphQL', content: 'Deep dive into GraphQL features', authorId: 2 },
    { id: 3, title: 'GraphQL Best Practices', content: 'Tips and tricks for using GraphQL effectively', authorId: 3 },
  ],
};

const PORT = 3000;
const app = express();

const plainSchema = getPlainSchema(data);

app.use('/graphql', jsonGraphqlExpress(data));
app.listen(PORT);