import mongoose, { Schema } from "mongoose";

const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    
})

export default mongoose.model("Notes", notesSchema);