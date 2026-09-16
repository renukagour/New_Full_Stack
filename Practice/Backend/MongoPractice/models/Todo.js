import mongoose from "mongoose";

const TodoSchema=new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        
      },
      description: {
        type: String,
        default: '',
      },
      completed: {
        type: Boolean,
        default: false,
      },
});

export const Todo=mongoose.model("Todo",TodoSchema)