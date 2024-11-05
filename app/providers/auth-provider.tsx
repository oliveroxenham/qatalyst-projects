'use client';

import '@aws-amplify/ui-react/styles.css';
import { Authenticator } from '@aws-amplify/ui-react';
import AuthenticatorComponent from './authenticator';

function AuthProvider({ children }: { readonly children: React.ReactNode }) {
  const cognitoConfig = {
    Auth: {
      Cognito: {
        identityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL_ID || '',
        region: process.env.NEXT_PUBLIC_COGNITO_REGION || '',
        userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_WEB_CLIENT_ID || '',
        userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || '',
      },
    },
  };
  console.log('>>>> cognitoConfig', cognitoConfig);
  return (
    <Authenticator.Provider>
      <AuthenticatorComponent cognitoAuth={cognitoConfig}>
        {children}
      </AuthenticatorComponent>
    </Authenticator.Provider>
  );
}

export default AuthProvider;
