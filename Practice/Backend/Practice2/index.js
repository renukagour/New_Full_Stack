const http = require('node:http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
  res.setHeader('Content-Type', 'text/html');
  res.end('<h2>Hello, World!</h2>');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

const a=require('./mymodule2');
console.log(a, __dirname,__filename);


//ecmamodule
// import { createServer } from 'node:http';

// const server = createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello World!\n');
// });

// // starts a simple http server locally on port 3000
// server.listen(3000, '127.0.0.1', () => {
//   console.log('Listening on 127.0.0.1:3000');
// });

// import {a,b,d } from './mymodule.js'
// console.log(a,b,d);

// import def from './mymodule.js'
// console.log(def); // no need to use of bracket and same name

