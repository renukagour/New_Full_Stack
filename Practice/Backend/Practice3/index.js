// const http =require('http');

// const fs=require('fs');

// console.log("Starting");
// fs.writeFileSync("file1.txt","Hello this is 1st file");
// console.log("ending");
// above only for synchronous way  so use below

// console.log("Starting");
// fs.writeFile("file2.txt","Hello this is 2nd file",()=>{
//     console.log("done");
//     fs.readFile("file2.txt",(err,data)=>{
//         console.log(err,data); //so in binary so use below
//         console.log(data.toString());
//     })
// });
// console.log("ending");

// fs.appendFile("file2.txt"," Appending new data",(err,data)=>{
//     console.log(data);
// })


// const server=http.createServer((req,res)=>{
//     res.end("HEllo ");
// })

// server.listen(3000,()=>{
//     console.log("server is running");
// })


// mainpromise using type module
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});