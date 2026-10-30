import express from 'express';
import Match from '../models/Match.js';
import Company from '../models/Company.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const [companies, matches] = await Promise.all([
      Company.find({}).populate('industry'),
      Match.find({})
        .populate({
          path: 'resource',
          populate: [
            { path: 'company', populate: { path: 'industry' } },
            { path: 'material' }
          ]
        })
        .populate({
          path: 'requirement',
          populate: [
            { path: 'company', populate: { path: 'industry' } },
            { path: 'acceptableMaterials' }
          ]
        })
    ]);

    let totalWasteKg = 0;
    let totalCo2Kg = 0;
    let totalCostINR = 0;

    // Cluster aggregation
    const clusterMap = {};

    matches.forEach(m => {
      const wasteKg = m.impact?.wasteDivertedKg || 0;
      const co2Kg = m.impact?.co2SavedKg || 0;
      const costINR = m.impact?.costSavedINR || 0;

      totalWasteKg += wasteKg;
      totalCo2Kg += co2Kg;
      totalCostINR += costINR;

      const clusterA = m.resource?.company?.location?.midcCluster || 'Other';
      const clusterB = m.requirement?.company?.location?.midcCluster || 'Other';

      [clusterA, clusterB].forEach(cluster => {
        if (!clusterMap[cluster]) {
          clusterMap[cluster] = {
            cluster,
            wasteDivertedTons: 0,
            co2AvoidedTons: 0,
            costSavedINR: 0,
            matchesCount: 0
          };
        }
      });

      // Split impact credit across clusters
      clusterMap[clusterA].wasteDivertedTons += Math.round(wasteKg / 2000);
      clusterMap[clusterA].co2AvoidedTons += Math.round(co2Kg / 2000);
      clusterMap[clusterA].costSavedINR += Math.round(costINR / 2);
      clusterMap[clusterA].matchesCount += 1;

      if (clusterB !== clusterA) {
        clusterMap[clusterB].wasteDivertedTons += Math.round(wasteKg / 2000);
        clusterMap[clusterB].co2AvoidedTons += Math.round(co2Kg / 2000);
        clusterMap[clusterB].costSavedINR += Math.round(costINR / 2);
        clusterMap[clusterB].matchesCount += 1;
      }
    });

    const clusterBreakdown = Object.values(clusterMap)
      .map(c => ({
        ...c,
        costSavedLakhs: Math.round((c.costSavedINR / 100000) * 10) / 10
      }))
      .sort((a, b) => b.wasteDivertedTons - a.wasteDivertedTons);

    // Cumulative trend line simulation representing deployment across quarters
    const months = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'];
    const totalWasteTons = Math.round(totalWasteKg / 1000);
    const totalCo2Tons = Math.round(totalCo2Kg / 1000);
    const totalCostLakhs = Math.round((totalCostINR / 100000) * 10) / 10;

    const trendData = months.map((month, idx) => {
      const factor = (idx + 1) / months.length;
      // S-curve growth factor
      const sFactor = Math.pow(factor, 1.4);
      return {
        period: month,
        wasteDivertedTons: Math.round(totalWasteTons * sFactor),
        co2AvoidedTons: Math.round(totalCo2Tons * sFactor),
        costSavedLakhs: Math.round(totalCostLakhs * sFactor * 10) / 10
      };
    });

    // Leaderboard of top 6 matches
    const leaderboard = [...matches]
      .sort((a, b) => (b.score * (b.impact?.costSavedINR || 1)) - (a.score * (a.impact?.costSavedINR || 1)))
      .slice(0, 6)
      .map(m => ({
        id: m._id,
        score: m.score,
        resourceCompany: m.resource?.company?.name,
        resourceSector: m.resource?.company?.industry?.sector,
        requirementCompany: m.requirement?.company?.name,
        requirementSector: m.requirement?.company?.industry?.sector,
        material: m.resource?.material?.name,
        wasteDivertedTons: Math.round((m.impact?.wasteDivertedKg || 0) / 1000),
        co2AvoidedTons: Math.round((m.impact?.co2SavedKg || 0) / 1000),
        costSavedLakhs: Math.round(((m.impact?.costSavedINR || 0) / 100000) * 10) / 10,
        isCrossSector: m.isCrossSector,
        cluster: m.resource?.company?.location?.midcCluster
      }));

    res.json({
      totals: {
        totalCompanies: companies.length,
        totalMatches: matches.length,
        wasteDivertedKg: totalWasteKg,
        wasteDivertedTons: totalWasteTons,
        co2AvoidedKg: totalCo2Kg,
        co2AvoidedTons: totalCo2Tons,
        costSavedINR: totalCostINR,
        costSavedLakhs: totalCostLakhs
      },
      clusterBreakdown,
      trendData,
      leaderboard
    });
  } catch (err) {
    console.error('Error computing impact stats:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
