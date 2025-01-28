export const GET_PROJECTS_URL = '/api/projects/get';
export const GET_DOCUMENTS_URL = '/api/documents/get';
export const QATALYST_RESPONSE = {
  SATISFACTORY: 1,
  INVESTIGATE: 0,
  UNSATISFACTORY: -1,
};
export const USER_RATING = {
  SATISFACTORY: 1,
  INVESTIGATE: 0,
  UNSATISFACTORY: -1,
};
export const FINANCIAL_ASSESSMENT_ITEMS = [
  'projectValue',
  'estimatedReductions',
  'totalEstimatedReductions',
  'projectDuration',
  'projectArea',
  'estimatedReductionsPerUnitAreaPerYear',
  'estimatedReductionsPerUnitArea',
  'landAcquisitionCost',
  'landPerUnitAreaCost',
  'plantationEstablishmentMaintenanceCost',
  'costOfGoodsSold',
  'overheads',
  'totalGrossCosts',
  'alternateRevenueSources',
  'costOfFinancing',
  'tax',
];

export const ESG_ASSESSMENT_ITEMS = [
  'human-rights',
  'gender-equality',
  'community-health',
  'labour-rights',
  'cultural-heritage',
  'indigenous-people',
  'land-acquisition',
  'corruption'
]
