import mongoose from 'mongoose';
import { createModelProxy } from './modelProxy.js';

const RequirementSchema = new mongoose.Schema({
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  acceptableMaterials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Material' }],
  quantityNeeded: { type: Number, required: true },
  unit: { type: String, required: true, default: 'tons' },
  frequency: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'monthly', 'batch']
  },
  toleranceSpec: { type: String, default: '' },
  maxDistanceKm: { type: Number, required: true, default: 250 },
  status: {
    type: String,
    enum: ['active', 'fulfilled', 'archived'],
    default: 'active'
  }
}, { timestamps: true });

const RawRequirement = mongoose.models.Requirement || mongoose.model('Requirement', RequirementSchema);
export default createModelProxy('Requirement', RawRequirement);
