import mongoose from 'mongoose';
import { createModelProxy } from './modelProxy.js';

const MatchSchema = new mongoose.Schema({
  resource: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },
  requirement: { type: mongoose.Schema.Types.ObjectId, ref: 'Requirement', required: true },
  score: { type: Number, required: true },
  breakdown: {
    compatibility: { type: Number, required: true },
    quantity: { type: Number, required: true },
    distance: { type: Number, required: true },
    frequency: { type: Number, required: true },
    verification: { type: Number, required: true }
  },
  distanceKm: { type: Number, default: 0 },
  isCrossSector: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ['suggested', 'reviewing', 'connected', 'executed', 'declined'],
    default: 'suggested'
  },
  impact: {
    co2SavedKg: { type: Number, default: 0 },
    costSavedINR: { type: Number, default: 0 },
    wasteDivertedKg: { type: Number, default: 0 }
  },
  aiExplanation: { type: String, default: '' },
  requiresRegulatoryCheck: { type: Boolean, default: false }
}, { timestamps: true });

const RawMatch = mongoose.models.Match || mongoose.model('Match', MatchSchema);
export default createModelProxy('Match', RawMatch);
