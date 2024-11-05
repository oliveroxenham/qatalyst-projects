import { FormFields } from '@/components/SignUpFormFields';
import { WithAuthenticatorOptions } from '@aws-amplify/ui-react';

const formFields = {
  signUp: {
    'custom:user_type': {
      isRequired: true,
      order: 2,
    },
    email: {
      isRequired: true,
      order: 3,
    },
    family_name: {
      isRequired: true,
      order: 5,
    },
    name: {
      isRequired: true,
      order: 1,
    },
    password: {
      autocomplete: 'new-password',
      isRequired: true,
      order: 4,
    },
    // confirm_password: {
    //   autocomplete: 'new-password',
    //   isRequired: true,
    //   order: 6,
    // },
  },
};

export const getCognitoConfig = (): WithAuthenticatorOptions => ({
  components: FormFields,
  formFields,
  loginMechanisms: ['email'],
  signUpAttributes: [],
});
