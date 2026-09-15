const express=require('express');
const app=express();

app.use(express.static('public'))

// middleware 1
app.use((req, res, next) => {
    console.log("Method is ",req.method);
    req.newData="Adding new Data"; //access in any routes
    console.log('Time: m1', Date.now());
    next();
  });

//   middleware2
  app.use((req, res, next) => {
    console.log('Time: m2', Date.now());
    next();
  });

// routes example
const blog=require('./routes/blog')
app.use('/blog',blog);

const shop=require('./routes/shop');
app.use('/shop',shop)

//request chaining
app.get('/',(req,res)=>{
    res.send("hello")
}).post('/',(req,res)=>{
    // console.log(req.query);
    res.send("hello post");
})

app.put('/',(req,res)=>{
    console.log(req.query);
    res.send("hello put");
})

app.get('/about',(req,res)=>{
    console.log(req.newData);
    res.send("hello about")
})
app.get('/index',(req,res)=>{
    // res.send("hello index");
    res.sendFile('./templates/index.html',{root:__dirname})
})

app.get('/api',(req,res)=>{
    // res.send("hello index");
    res.json({a:1,b:2,c:3,name:["renu","rajesh"]})
})
app.listen(3000,()=>{
    console.log("server is running");
})