import mongoose from 'mongoose';
import { createModelProxy } from './modelProxy.js';

const MaterialSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['hazardous', 'non_hazardous', 'byproduct'] 
  },
  defaultUnit: { type: String, required: true, default: 'tons/month' },
  compatibleCategories: [{ type: String }],
  hazardClass: { type: String, default: 'None' }
}, { timestamps: true });

const RawMaterial = mongoose.models.Material || mongoose.model('Material', MaterialSchema);
export default createModelProxy('Material', RawMaterial);
