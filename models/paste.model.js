import mongoose from "mongoose";

const pasteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    }, 
    content: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        required: true,
        enum: ["code", "text", "json", "other"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true});

const Paste = mongoose.model("paste", pasteSchema);

export default Paste;