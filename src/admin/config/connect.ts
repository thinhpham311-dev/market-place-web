import mongoose from "mongoose";

const MONGO_URI = process.env.NEXT_PUBLIC_MONGODB_URI as string;

if (!MONGO_URI) {
    throw new Error("Please define the NEXT_PUBLIC_MONGODB_URI environment variable");
}

// Prevent multiple connections
let isConnected = false;

export const connectDB = async () => {

    if (isConnected) {
        console.log("Using existing MongoDB connection");
        return;
    }

    mongoose.disconnect()

    try {
        const db = await mongoose.connect(MONGO_URI);
        isConnected = db.connections[0].readyState === 1;
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", (error as Error).message);
    }
};
