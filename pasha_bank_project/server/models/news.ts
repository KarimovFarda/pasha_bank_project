import mongoose, { Schema } from "mongoose";

const newsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
})

export default mongoose.model("News", newsSchema);