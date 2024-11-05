import { MethodCreateProjectEnum } from '../(authenticated)/projects/new/components/ChooseMethod';
import { QatalystProjectTypeEnum } from '../(authenticated)/projects/new/components/ChooseQatalystProjectType';
import { Developer } from './developer';
import { Document, LastActivityDescription } from './document';
import { ProjectEsgStatus, ProjectFinancialStatus } from './status';
import { User } from './user';

export type FinalComment = {
  id: string;
  createdAt?: string;
  modifiedAt?: string;
  text: string;
  type: string;
  author: User;
};

export type Project = {
  address: string;
  id: string;
  category: string;
  city: string;
  createdAt: string;
  contributors: User[];
  modifiedAt: string;
  developer: Developer;
  documents: Document[];
  locationDetails: string[][];
  percentageComplete: number;
  description: string;
  name: string;
  countryCode: number;
  countryName?: string;
  regionCode: number;
  proponent: string;
  statusCode: number;
  statusName?: string;
  carbonEstimates: number;
  title: string;
  typeCode: number;
  typeName?: string;
  methodologyCode: number;
  methodologyName?: string;
  size: number;
  sizeUnitCode: number;
  financialStatus: string;
  esgStatus: string;
  financialAssignee: User;
  esgAssignee: User;
  author: User;
  latitude: number;
  longitude: number;
  sdgs: number[];
  sourceType: MethodCreateProjectEnum;
  activities: Activity[];
  activitiesDetails: {
    count: number;
    currentPage: number;
    data: LastActivityDescription[];
    totalPages: number;
  };
  editedFields: string[];
  originalId: string;
  registryProjectId: string;
  financialFinalComment?: FinalComment;
  qatalystProjectType: QatalystProjectTypeEnum;
  // only for UI
  countrySourceType?: string;
  lastLlmTask: LastLLmTask;
};

export type LastLLmTask = {
  taskType: 'GENERATE_FINANCIAL_ASSESSMENT';
  taskStatus: 'IN_PROGRESS' | 'FAILED' | 'DONE';
};

export type Activity = {
  id: string;
  createdAt: string;
  comment: {
    author: User;
    createdAt: string;
    id: string;
    modifiedAt: string;
    position: any;
    text: string;
  };
  document: {
    createdAt: string;
    fileName: string;
    id: string;
    isUploaded: boolean;
    modifiedAt: string;
    url: string;
  };
  modifiedAt: string;
  activityType: ActivityType;
  resourceType: string;
  resourceVersion: number;
  activityData: any;
  user: User;
};

export enum ActivityType {
  PROJECT_CREATE = 'ProjectCreate',
  PROJECT_UPDATE = 'ProjectUpdate',
  PROJECT_DELETE = 'ProjectDelete',
  PROJECT_IMPORT = 'ProjectImport',
  PROJECT_ADD_COLLABORATOR = 'ProjectAddCollaborator',
  DOCUMENT_UPLOAD = 'DocumentUpload',
  DOCUMENT_DELETE = 'DocumentDelete',
  DOCUMENT_IMPORT_ALL = 'DocumentImportAll',
  COMMENT_CREATE = 'CommentCreate',
  COMMENT_EDIT = 'CommentEdit',
  COMMENT_DELETE = 'CommentDelete',
}

export type ProjectsResponse = {
  data: Project[];
  total: number;
};

export type GetProjectsParams = {
  authorId?: string;
  projectName?: string;
  country?: string;
  financialStatus?: string;
  esgStatus?: string;
  kycStatus?: string;
  page?: number;
  limit?: number;
  projectGroupId?: string;
};

export type UpdateProjectParams = {
  locationDetails?: string[][];
  percentageComplete?: number;
  description?: string;
  name?: string;
  countryCode?: number;
  regionCode?: number;
  proponent?: string;
  statusCode?: number;
  carbonEstimates?: number;
  typeCode?: number;
  methodologyCode?: number;
  size?: number;
  sizeUnitCode?: number;
  city?: string;
  financialStatus?: ProjectFinancialStatus;
  esgStatus?: ProjectEsgStatus;
  financialAssignee?: string | null;
  esgAssignee?: string | null;
  province?: string;
  unitCarbonEstimates?: string;
  sourceType?: 'Scratch' | 'Verra' | 'GS';
  originalId?: string;
  allowDuplicate?: boolean;
  latitude?: number | string;
  longitude?: number | string;
};

export enum ProjectFilter {
  REGISTRY_NAME = 'sourceType',
  COUNTRY = 'country',
  CREATED_BY = 'authorId',
  FINANCIAL = 'financialStatus',
  ESG = 'esgStatus',
  KYC = 'kycStatus',
  QATALYST_PROJECT_TYPE = 'qatalystType',
}

export type ImportProjectParams = {
  sourceType: 'GS' | 'Verra';
  originalId: string;
};

export enum ProjectSortBy {
  BACKGROUND = 'background',
  CARBON_ESTIMATES = 'carbonEstimates',
  COUNTRY = 'country',
  CREATED_AT = 'createdAt',
  CREATED_BY = 'createdBy',
  ESG_STATUS = 'esgStatus',
  FINANCIAL_STATUS = 'financialStatus',
  ID = 'id',
  METHODOLOGY = 'methodology',
  NAME = 'name',
  PROPONENT = 'proponent',
  REGISTRY_NAME = 'sourceType',
  REGISTRY_PROJECT_ID = 'originalId',
  SIZE = 'size',
  PROJECT_STATUS = 'status',
  PROJECT_TYPE = 'type',
  QATALYST_PROJECT_TYPE = 'qatalystType',
}

export type CreateNewProjectGroupParams = {
  name: string;
  projectIds: string[];
};

export type CreateNewProjectParams = {
  carbonEstimates?: number;
  province?: string;
  countryCode?: number;
  description?: string;
  methodologyCode?: number;
  name: string;
  proponent?: string;
  latitude?: string | number;
  longitude?: string | number;
  size?: number;
  sizeUnitCode?: number;
  statusCode?: number;
  typeCode?: number;
  unitCarbonEstimates?: string;
  sourceType: 'Scratch' | 'Verra' | 'GS';
  originalId?: string;
  allowDuplicate?: boolean;
};
