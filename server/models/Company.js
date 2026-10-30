import mongoose from 'mongoose';
import { createModelProxy } from './modelProxy.js';

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  industry: { type: mongoose.Schema.Types.ObjectId, ref: 'Industry', required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    address: { type: String, required: true },
    midcCluster: { type: String, required: true }
  },
  verified: { type: Boolean, default: true },
  contactEmail: { type: String, required: true },
  authorizedForHazardous: { type: Boolean, default: true }
}, { timestamps: true });

const RawCompany = mongoose.models.Company || mongoose.model('Company', CompanySchema);
export default createModelProxy('Company', RawCompany);
