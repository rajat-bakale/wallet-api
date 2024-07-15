import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set Mongoose to use strict query rules
mongoose.set('strictQuery', true);

async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;
  try {
    if (!uri) {
      throw new Error('The MongoDB URI is not defined.');
    }
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    throw error;
  }
}

// Export the connectToMongoDB function
export { connectToMongoDB };

// Optional: Export as default for more flexible imports
export default connectToMongoDB;
