import mongoose from "mongoose";


export const connectDB = async (uri: string) => {

    try {
        if (mongoose.connection.readyState >= 1) {
            console.log("Already connected to MongoDB");
            return;
        }
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
};
