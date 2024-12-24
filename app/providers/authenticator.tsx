'use client';

import '@aws-amplify/ui-react/styles.css';
import { getCognitoConfig } from '../constants/aws';
import { Authenticator } from '@aws-amplify/ui-react';
import { datadogRum } from '@datadog/browser-rum';
import { Amplify } from 'aws-amplify';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Hub } from 'aws-amplify/utils';
import { useEffect, useMemo, useState } from 'react';

function AuthenticatorComponent({ cognitoAuth, children }: {cognitoAuth : {
  Auth: {
    Cognito: {
      identityPoolId: string;
      region: string
      userPoolClientId: string;
      userPoolId: string;
    },
  },
}, children: React.ReactNode}) {
  const [loading, setLoading] = useState(true);
  const cognitoConfig = useMemo(() => getCognitoConfig(), []);

  useEffect(() => {
    // Listen for Amplify Auth events
    Hub.listen('auth', async ({ payload }) => {
      const { event } = payload;

      if (event === 'signedIn') {
        const attributes = await fetchUserAttributes();
        console.log('user attributes=', attributes);
        // Add user to Datadog session
        datadogRum.setUser({
          email: attributes.email,
          id: attributes.sub,
          name: attributes.name,
          userType: attributes['custom:user_type'],
        });
        // Add event to Datadog log
        datadogRum.addAction('User Login', {
          email: attributes.email,
          id: attributes.sub,
          name: attributes.name,
          userType: attributes['custom:user_type'],
        });
      } else if (event === 'signedOut') {
        datadogRum.addAction('User Logout');
        datadogRum.clearUser();
      }
    });
    console.log('cognitoAuth', cognitoAuth);
    Amplify.configure(cognitoAuth, { ssr: true });
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return null;
  }

  return (
      <Authenticator {...cognitoConfig} variation='modal'>
        {children}
      </Authenticator>
  );
};

export default AuthenticatorComponent;
