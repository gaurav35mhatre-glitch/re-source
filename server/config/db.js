import mongoose from 'mongoose';
import { setForceInMemory } from '../models/modelProxy.js';

let mongodInstance = null;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (uri && uri !== 'none') {
    try {
      console.log(`Connecting to MongoDB at configured URI: ${uri}`);
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
      console.log('MongoDB connected successfully via MONGO_URI');
      return;
    } catch (err) {
      console.warn(`Could not connect to configured MONGO_URI (${err.message}).`);
    }
  }

  // If explicitly enabled, attempt MongoMemoryServer
  if (process.env.USE_MONGO_MEMORY_SERVER === 'true') {
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongodInstance = await MongoMemoryServer.create();
      const memoryUri = mongodInstance.getUri();
      await mongoose.connect(memoryUri);
      console.log(`Embedded MongoMemoryServer connected successfully at ${memoryUri}`);
      return;
    } catch (memErr) {
      console.warn(`MongoMemoryServer startup failed: ${memErr.message}`);
    }
  }

  // Seamless Zero-Dependency In-Memory Store
  console.log('Activating high-performance built-in In-Memory Database store for instant execution...');
  setForceInMemory(true);
};

export const closeDB = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect();
  }
  if (mongodInstance) {
    await mongodInstance.stop();
  }
};
