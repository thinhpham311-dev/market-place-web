import { Schema, model, models } from "mongoose";
import { Counter } from "./counter";

const orderSchema = new Schema({
    orderId: {
        type: String,
        unique: true
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true
    },
    deliveryPartner: {
        type: Schema.Types.ObjectId,
        ref: "DeliveryPartner"
    },
    branch: {
        type: Schema.Types.ObjectId,
        ref: "Branch",
        required: true
    },
    items: [
        {
            id: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            item: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            count: { type: Number, required: true },
        }
    ],
    deliveryLocation: {
        latitude: { type: Number, required: true },
        longtitude: { type: Number, required: true },
        address: { type: String },
    },
    pickupLocation: {
        latitude: { type: Number, required: true },
        longtitude: { type: Number, required: true },
        address: { type: String },
    },
    deliveryPersonLocation: {
        latitude: { type: Number },
        longtitude: { type: Number },
        address: { type: String },
    },
    status: {
        type: String,
        enum: ["available", "confirmed", "arriving", "delivered", "cancelled"],
        default: "available"
    },
    totalPrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

async function getNextSequenceValue(sequenceName: string) {
    const sequenceDocument = await Counter.findOneAndUpdate({
        name: sequenceName
    }, {
        $inc: { sequence_value: 1 }
    }, {
        new: true, upsert: true
    });
    return sequenceDocument.sequence_value
}

orderSchema.pre("save", async function (next) {
    if (this.isNew) {
        const sequenceValue = await getNextSequenceValue("orderId");
        this.orderId = `ORDR${sequenceValue.toString().padStart(5, "0")}`;
    }
    next()
})


export const Order = models.Order || model("Order", orderSchema);

