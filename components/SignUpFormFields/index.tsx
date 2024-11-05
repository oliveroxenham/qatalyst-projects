import { UserRole } from '@/app/types/userRole';
// import Qatalyst from '@/public/icons/logo-circle.svg';
import { PasswordField, SelectField, TextField } from '@aws-amplify/ui-react';

export const FormFields = {
  // Header() {
  //   return (
  //     <div className='sign-in-banner mx-auto flex flex-col items-start justify-center px-0 text-left md:px-10'>
  //       <Qatalyst className='mb-5 w-16 fill-black' />
  //       <h1 className='mb-6 text-xl font-bold leading-normal text-white drop-shadow md:text-[48px] md:leading-[56px] lg:leading-[60px]'>
  //         Unlock a whole new class of carbon projects
  //       </h1>
  //       <p className='text-base font-normal leading-[24px] text-white md:text-2xl md:leading-[38px] lg:text-2xl lg:leading-[38px]'>
  //         Qatalyst unlocks a new range of carbon projects with its buyer-centric platform, significantly improving the
  //         identification, evaluation, and monetization of carbon offsets for greater sustainability.
  //       </p>
  //     </div>
  //   );
  // },
  SignUp: {
    FormFields() {
      return (
        <>
          <div className='flex gap-4'>
            <TextField id='name' label='First Name' name='name' placeholder='First Name' />
            <TextField id='family_name' label='Last Name' name='family_name' placeholder='Last Name' />
          </div>
          <SelectField id='custom:user_type' label='User type' name='custom:user_type'>
            <option value={UserRole.Admin}>Admin</option>
            <option value={UserRole.ProjectDeveloper}>Project Developer</option>
            <option value={UserRole.FinanceAnalyst}>Finance Analyst</option>
            <option value={UserRole.EsgAnalyst}>ESG Analyst</option>
            <option value={UserRole.Other}>Other</option>
          </SelectField>
          <TextField
            autoCapitalize='none'
            autoComplete='username'
            id='email'
            label='Email'
            name='email'
            placeholder='Email'
            type='email'
          />
          <PasswordField placeholder='Password' autoComplete='new-password' label='Password' name='password' />
        </>
      );
    },
  },
};
