/* eslint-disable @typescript-eslint/no-explicit-any */
export type Menu = {
  help: MenuItem[];
  overview: MenuItem[];
  project: MenuItem[];
};

export type MenuItem = {
  icon?: any;
  isNotDevelop?: boolean;
  path: string;
  subMenu?: MenuItem[];
  title: string;
};
