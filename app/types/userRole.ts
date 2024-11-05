export enum UserRole {
  Unknown = 'unknown',
  Admin = 'admin',
  ProjectDeveloper = 'project_developer',
  FinanceAnalyst = 'finance_analyst',
  EsgAnalyst = 'esg_analyst',
  Other = 'other',
}

export const fromString = (s: string): UserRole => {
  switch (s) {
    case 'unknown':
      return UserRole.Unknown;
    case 'admin':
      return UserRole.Admin;
    case 'project_developer':
      return UserRole.ProjectDeveloper;
    case 'finance_analyst':
      return UserRole.FinanceAnalyst;
    case 'esg_analyst':
      return UserRole.EsgAnalyst;
    case 'other':
      return UserRole.Other;
    default:
      return UserRole.Unknown;
  }
};
