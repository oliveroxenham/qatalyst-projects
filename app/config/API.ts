export const API = {
  ADD_COLLABORATORS: (uuid: string) => `/projects/${uuid}/collaborators`,
  ADD_NEW_PROJECTS: '/projects',
  ASSESSMENT_EVENT_SOURCE: (projectId: string) => `/projects/${projectId}/assessment-events`,
  COMMENTS: (id: string) => `/documents/${id}/comments`,
  COUNTRY: '/static-data/country',
  CURRENT_USER: '/users/current',
  DASHBOARD_PROJECTS: '/dashboard/projects',
  DASHBOARD_SUMMARY: '/dashboard/summary',
  DELETE_DOCUMENT: (id: string) => `/documents/${id}`,
  DELETE_PROJECT: (id: string) => `/projects/${id}`,
  DELETE_PROJECT_GROUP: (id: string) => `/project-group/${id}`,
  DOCUMENTS: '/documents',
  DOWNLOAD_DOCUMENT: (id: string) => `/documents/download-url/${id}`,
  DOWNLOAD_URL: (id: string) => `/download-url/${id}`,
  EDIT_PROJECT: (id: string) => `/projects/${id}`,
  ELIGIBILITY_FINAL_COMMENT: (id: string) => `/projects/${id}/financial-assessment/final-comment`,
  ESG_ASSESSMENT: '/esg',
  ESG_FINAL_COMMENT: '/esg/final-comment',
  ESG_MARK_DATA_SOURCES: '/esg/references',
  ESG_RISK_RATING: (id: string) => `/esg/${id}`,
  ESG_RISK_SOURCE: (id: string) => `/esg/${id}/references`,
  FINANCIAL_ASSESSMENT: (id: string) => `/projects/${id}/financial-assessment`,
  GENERATE_ASSESSMENT: `/gen-ai/generate-assessment`,
  IMPORT_PROJECT: '/projects/external',
  MESSAGE: '/chat/messages',
  MY_PROJECT_GROUPS: '/project-group/my-groups',
  PROJECT_GROUP: '/project-group',
  PROJECTS: '/projects/my-workspace',
  REQUEST_ACCESS: (id: string) => `/projects/${id}/request-access`,
  SAVE_DRAFT_PROJECT: '/projects/draft',
  SCORE_CARD: (id: string) => `/projects/${id}/score-card`,
  SESSION: '/chat/sessions',
  STATIC_DATA: '/static-data',
  UPDATE_COMMENTS: (documentId: string, commentId: string) => `/${documentId}/comments/${commentId}`,
  UPDATE_PROJECT_GROUP: (id: string) => `/project-group/${id}`,
  UPLOAD_DOCUMENT: '/documents/uploaded',
  USERS: '/users',
  
  // Helper function to add language param to any API URL
  withLanguage: (url: string, language?: string) => {
    if (!language) return url;
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}lang=${language}`;
  }
};
