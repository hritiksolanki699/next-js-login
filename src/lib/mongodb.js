import mongoose from 'mongoose';

let connected = false;

const connectToDatabase = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error('MongoDB URI is not defined. Check your environment variables.');
    throw new Error('MongoDB URI is not defined');
  }

  if (connected) {
    console.log('MongoDB is already connected...');
    return;
  }

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    connected = true;
    console.log('MongoDB is connected...');
  } catch (error) {
    console.log('MongoDB connection failed.');
    console.error(error);
  }
};

export default connectToDatabase;
