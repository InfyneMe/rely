import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('connected to database');
    } catch (error) {
        console.log("Error connecting to database:", error);
    }
};

export default connectDB;