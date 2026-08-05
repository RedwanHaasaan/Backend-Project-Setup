import http, { type Server } from 'http';
import app from './app.js';
import { env } from './config/env.js';

const PORT = env.port;
let server: Server;

const bootStrap = async () => {
  const httpServer = http.createServer(app);

  server = httpServer.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
};
bootStrap();