import mongoose from 'mongoose';
import { createModelProxy } from './modelProxy.js';

const RegulationSchema = new mongoose.Schema({
  materialCategory: { type: String, required: true },
  hwmScheduleRef: { type: String, required: true },
  requiresAuthorization: { type: Boolean, default: true },
  applicableStates: [{ type: String, default: ['Maharashtra'] }],
  notes: { type: String, default: '' }
}, { timestamps: true });

const RawRegulation = mongoose.models.Regulation || mongoose.model('Regulation', RegulationSchema);
export default createModelProxy('Regulation', RawRegulation);
