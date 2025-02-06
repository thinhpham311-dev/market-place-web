import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Customer", "Admin", "DeliveryPartner"],
        required: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    expiresAt: { type: Date, required: true },
})

const customerSchema = new Schema({
    ...userSchema.obj,
    phone: { type: Number, required: true, unique: true },
    role: { type: String, enum: ["Customer"], default: "Customer" },
    liveLocation: {
        latitude: { type: Number },
        longtitude: { type: Number }
    },
    address: { type: String }
})

const deliveryPartnerSchema = new Schema({
    ...userSchema.obj,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true },
    role: { type: String, enum: ["DeliveryPartner"], default: "DeliveryPartner" },
    liveLocation: {
        latitude: { type: Number },
        longtitude: { type: Number }
    },
    address: { type: String },
    branch: {
        type: Schema.Types.ObjectId,
        ref: "Branch"
    }
})

const adminSchema = new Schema({
    ...userSchema.obj,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin"], default: "Admin" }
})


export const Customer = models.Customer || model("Customer", customerSchema);
export const DeliveryPartner = models.DeliveryPartner || model("DeliveryPartner", deliveryPartnerSchema);
export const Admin = models.Admin || model("Admin", adminSchema);
