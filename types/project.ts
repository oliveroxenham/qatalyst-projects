export type Tag = {
  value: string,
  type: string
};

export type Project = {
  id: string,
  imgUrl: string,
  name: string,
  country: string,
  countryName: string,
  state?: string;
  lastUpdated: string,
  tags: Tag[],
  creditingStartDate: string,
  creditingEndDate: string,
  proponent: string,
  background: string,
  latitude: string,
  longitude: string,
  createdBy: string,
  owner: string,
  collaborators: string[],
  registryStatus: string,
  projectType: string,
  estimatedAnnualCredits: {
    formatted: string,
    value: number,
    unit: string,
  },
  methodology: string,
  projectArea: {
    formatted: string,
    value: number,
    unit: string,
  },
  financialAssessment: {
    status: string,
    progress: number,
  },
  esgAssessment: {
    status: string,
    progress: number,
  },
  kycAssessment: {
    status: string,
    progress: number,
  },
  sdgs?: number[],
};