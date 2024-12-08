import mongoose from 'mongoose';

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) {
    console.log('Database is already connected.');
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables.');
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Uniux',
    });

    isConnected = !!connection.connections[0].readyState;
    console.log('Connected to Uniux MongoDB.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export default dbConnect;
