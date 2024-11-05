import packageJson from '../../package.json';

export const getAppVersion = () => {
  try {
    return packageJson.version;
  } catch (error) {
    console.error('Error reading package.json', error);
    return 'unknown';
  }
};

export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  aws: {
    cognito: {
      identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
      region: process.env.COGNITO_REGION,
      userPoolClientId: process.env.COGNITO_USER_POOL_WEB_CLIENT_ID, // todo: COGNITO_USER_POOL_CLIENT_ID
      userPoolId: process.env.COGNITO_USER_POOL_ID,
    },
    s3: {
      bucket: process.env.S3_BUCKET,
      region: process.env.S3_REGION,
    },
  },
  environment: process.env.ENVIRONMENT || process.env.NEXT_PUBLIC_ENVIRONMENT,
  version: getAppVersion(),
};

export const getAuthConfig = () => {
  const authConfig = {
    Auth: {
      Cognito: {
        allowGuestAccess: false,
        identityPoolId: config.aws.cognito.identityPoolId || '',
        region: config.aws.cognito.region || '',
        userPoolClientId: config.aws.cognito.userPoolClientId || '',
        userPoolId: config.aws.cognito.userPoolId || '',
      },
    },
  };

  return authConfig;
};
