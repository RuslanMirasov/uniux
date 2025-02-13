import mongoose from 'mongoose';

let isConnected = false;

const dbConnect = async () => {
  if (isConnected) return;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not defined in environment variables.');

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'uniuxdb',
    });

    isConnected = !!connection.connections[0].readyState;
    console.log('Connected to Uniux MongoDB.');
  } catch (error) {
    throw error;
  }
};

export default dbConnect;
