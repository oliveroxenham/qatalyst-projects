import { User } from './user';

export type Document = {
  bodyText: string;
  createdAt: string;
  editedAt: string;
  fileName: string;
  id: string;
  isUploaded?: boolean;
  modifiedAt: string;
  name: string;
  project?: ProjectDocuments;
  tags?: string;
  uploadedAt: string;
  uploadedBy: UploadedBy;
  url?: string;
  updatedBy?: string;
  updatedAt?: string;
  lastActivity: LastActivity;
  lastActivityDescription: LastActivityDescription;
  registryUploadDate?: string;
};

export type LastActivity = {
  id: string;
  createdAt: string;
  modifiedAt: string;
  activityTypes: string;
  resourceType: string;
  resourceVersion: number;
  activityData: string;
  user: User;
};

export type LastActivityDescription = {
  description: string;
  details: LastActivityDetails[];
  createdAt?: string;
  extraData?: {
    newContributorsList?: User[];
    oldContributorsList?: User[];
  };
};

export type LastActivityDetails = {
  code: string;
  value: User | string | DocumentActivityInfo;
};

export type DocumentActivityInfo = {
  documentId: string;
  documentName: string;
};

export type UploadedBy = {
  avatar?: string;
  cognitoSub?: string;
  createdAt?: string;
  email?: string;
  id?: string;
  modifiedAt?: string;
  name: string;
  userType?: string;
};

export type ProjectDocuments = {
  carbonEstimates: number;
  countryCode: number;
  createdAt: string;
  description: string;
  developer: string;
  id: string;
  locationDetails: string;
  methodologyCode: string;
  modifiedAt: string;
  name: string;
  percentageComplete: string;
  proponent: string;
  regionCode: string;
  size: string;
  sizeUnitCode: number;
  sourceType: 'GS' | 'Verra' | 'Scratch';
  statusCode: string;
  typeCode: string;
};

export type DocumentResponse = {
  count: number;
  currentPage: number;
  data: Document[];
  totalPages: number;
};

export enum DocumentSortBy {
  FILE_NAME = 'fileName',
  UPLOADER_NAME = 'uploaderName',
  CREATED_AT = 'createdAt',
  MODIFIED_AT = 'modifiedAt',
  LAST_ACTIVITY = 'lastActivity',
  DOCUMENT_DATE = 'registryUploadDate',
}
