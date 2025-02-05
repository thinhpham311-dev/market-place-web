import { Schema, model, models } from "mongoose";

const branchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    liveLocation: {
        latitude: { type: Number },
        longtitude: { type: Number }
    },
    address: { type: String },
})

export const Branch = models.Branch || model("Branch", branchSchema);

export default Branch