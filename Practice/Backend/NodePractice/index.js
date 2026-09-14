import http from 'http'

const server=http.createServer((req,res)=>{
    res.end("HEllo");

    
})

server.listen(3000,()=>{
    console.log(`Server is listening on 3000`);
})