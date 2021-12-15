import mongoose from 'mongoose';

const connectDB = async () => {
  return await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('[mongoDB] => successful connection');
    })
    .catch((e) => {
      console.error('[mongoDB] => connection error', e);
    });
};

export default connectDB;
