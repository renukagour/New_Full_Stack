import express from 'express';
import mongoose from 'mongoose';
import { Todo } from './models/Todo.js';

const app = express();

let conn = await mongoose.connect("mongodb://localhost:27017/DummyData")

app.get('/', (req, res) => {
    const todo = new Todo({
        title: 'Learn Mongoose',
        description: "Practicing "
    });
    todo.save();
    res.send("Hello");
})

app.get("/a",async (req,res)=>{
    const todo=await Todo.findOne({});
    console.log(todo);
    res.json(todo)
})
app.listen(3000, () => {
    console.log("server is running");
})