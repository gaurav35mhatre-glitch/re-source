import mongoose from 'mongoose';
import { createModelProxy } from './modelProxy.js';

const IndustrySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  sector: { type: String, required: true },
  nicCode: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

const RawIndustry = mongoose.models.Industry || mongoose.model('Industry', IndustrySchema);
export default createModelProxy('Industry', RawIndustry);
