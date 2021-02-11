import * as WebSocket from 'ws';
import * as http from 'http';
import mongoose from 'mongoose';

import { app } from './endpoint';
import { mongoDBConfig } from './config';

const server = http.createServer();
const WSServer = new WebSocket.Server({ server });

server.on('request', app);
WSServer.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log(`received: ${ message }`);
    ws.send(JSON.stringify({
      answer: 42
    }));
  });
});

mongoose
  .connect(mongoDBConfig, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log('Connected to mongo DB');
      server.listen(8080, () => console.log(`http/ws server listening on  8080`))
    }
  ).catch(err => console.error(err));
