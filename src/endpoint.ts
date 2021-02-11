import express from 'express';
import * as bodyParser from 'body-parser';
import { graphqlHTTP } from 'express-graphql'
import { schema } from './graphql/schema';
const cors = require('cors')
const app = express();

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

app.get('/', (req, res) => {
  res.send('The s antelope!');
});

export { app };
