export type ItemStaticData = {
  alphaCode?: string;
  avatar?: string;
  id: number | string;
  value: string;
  latitude?: number;
  longitude?: number;
};

export type StaticData = {
  projectCountry: ItemStaticData[];
  projectMethodology: ItemStaticData[];
  projectRegion: ItemStaticData[];
  projectSizeUnit: ItemStaticData[];
  projectStatus: ItemStaticData[];
  projectType: ItemStaticData[];
  projectSdgs: ItemStaticData[];
};

export enum LOCAL_STORAGE_KEY {
  CURRENT_USER_INFO = 'CURRENT_USER_INFO',
  PROJECT_COUNTRY = 'PROJECT_COUNTRY',
  PROJECT_METHODOLOGY = 'PROJECT_METHODOLOGY',
  PROJECT_REGION = 'PROJECT_REGION',
  PROJECT_STATUS = 'PROJECT_STATUS',
  PROJECT_TYPE = 'PROJECT_TYPE',
  PROJECT_SIZE_UNIT = 'PROJECT_SIZE_UNIT',
  PROJECT_SDGS = 'PROJECT_SDGS',
  API_URL = 'API_URL',
}

export type SortDirection = 'ASC' | 'DESC';

export enum TagEnum {
  EDITED = 'Edited',
  VERRA = 'VERRA',
  GOLD_STANDARD = 'Gold Standard',
  NOT_AVAILABLE = 'Not Available from Registry',
}
