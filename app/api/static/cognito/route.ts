import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

const getAuthConfig = () => {
  const authConfig = {
    Auth: {
      Cognito: {
        identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID || '',
        region: process.env.COGNITO_REGION || '',
        userPoolClientId: process.env.COGNITO_USER_POOL_WEB_CLIENT_ID || '', // COGNITO_USER_POOL_CLIENT_ID
        userPoolId: process.env.COGNITO_USER_POOL_ID || '',
      },
    },
  };

  return authConfig;
};

const data = getAuthConfig();

export const GET = async () => {
  return NextResponse.json(data);
};
