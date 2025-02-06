import { Schema, model, models } from "mongoose";

const counterSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    sequence_value: { type: Number, default: 0 }
})


export const Counter = models.Counter || model("Counter", counterSchema);

