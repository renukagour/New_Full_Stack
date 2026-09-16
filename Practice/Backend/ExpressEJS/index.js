const express=require('express');
const app=express();

app.use(express.static('public'))
app.set('view engine', 'ejs');
app.get('/',(req,res)=>{
    let brand="Fastrack";
    let arr=['drop1','drop2','drop3']
    res.render("index",{brand:brand,arr})
})

app.get('/index',(req,res)=>{
    // res.send("hello index");
    res.sendFile('./templates/index.html',{root:__dirname})
})

app.listen(3000,()=>{
    console.log("server is running");
})