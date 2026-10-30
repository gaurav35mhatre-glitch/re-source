import mongoose from 'mongoose';
import { inMemoryStore } from '../config/inMemoryStore.js';

let forceInMemory = false;

export function setForceInMemory(val) {
  forceInMemory = val;
}

export function isUsingInMemory() {
  return forceInMemory || mongoose.connection.readyState !== 1;
}

export function createModelProxy(modelName, mongooseModel) {
  return new Proxy(mongooseModel, {
    get(target, prop, receiver) {
      if (isUsingInMemory()) {
        const memCol = inMemoryStore.collections[modelName];
        if (memCol && typeof memCol[prop] === 'function') {
          return memCol[prop].bind(memCol);
        }
        if (memCol && prop in memCol) {
          return memCol[prop];
        }
      }
      return Reflect.get(target, prop, receiver);
    }
  });
}
