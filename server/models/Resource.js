import mongoose from 'mongoose';
import { createModelProxy } from './modelProxy.js';

const ResourceSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  material: { type: mongoose.Schema.Types.ObjectId, ref: 'Material', required: true },
  type: {
    type: String,
    required: true,
    enum: ['waste', 'byproduct', 'surplus_capacity']
  },
  quantity: { type: Number, required: true },
  unit: { type: String, required: true, default: 'tons' },
  frequency: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'monthly', 'batch']
  },
  qualitySpec: { type: String, default: '' },
  aiSuggestedUses: [{ type: String }],
  status: {
    type: String,
    enum: ['active', 'matched', 'archived'],
    default: 'active'
  }
}, { timestamps: true });

const RawResource = mongoose.models.Resource || mongoose.model('Resource', ResourceSchema);
export default createModelProxy('Resource', RawResource);
