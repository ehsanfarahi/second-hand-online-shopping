const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

server.use(middlewares);
server.use(router);

server.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).send('Internal Server Error');
});

module.exports = server;
