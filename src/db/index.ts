import mongoose from "mongoose";

export async function connectToDatabase(callback: () => void) {
    try {
        await mongoose.connect(process.env.DB_URI!);
        console.log("Connected to database successfully");
        callback();
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}