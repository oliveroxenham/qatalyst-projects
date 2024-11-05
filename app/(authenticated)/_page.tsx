import Link from 'next/link';

const Login = () => {
  return (
    <div className=''>
      <main className='flex h-screen flex-col justify-center bg-transparent px-10 lg:flex-row'>
        <div className='flex flex-col items-center justify-center px-10 text-center lg:w-3/5'>
          <h1 className='text-4xl text-white drop-shadow'>Simplifying every step of your carbon journey</h1>
          <p className='mt-10 text-lg text-white drop-shadow lg:mx-10'>
            We are building a tech-enabled platform that aims to make it simple, safe and financially attractive for
            companies to invest in conservation projects. By leveraging <strong>bank-grade risk management </strong>
            processes, <strong>AI-driven</strong> risk assessments, <strong>comprehensive KYC</strong> and an ecosystem
            of <strong>trusted insurance</strong> providers, our goal is to protect your journey to net zero.
          </p>
        </div>
        <div className='mt-20 flex flex-col items-center justify-center lg:m-0 lg:w-2/5'>
          <div className='text-zinc-700 rounded-xl bg-[#E2E8F0] bg-opacity-50 p-10 shadow-lg'>
            <form id='login-form' target='/auth/login'>
              <h2 className='pb-8 text-center'>Login</h2>
              <div>
                <label className='text-sm' htmlFor='email'>
                  Email
                </label>
                <input className='mt-2 w-full rounded-md' id='email' type='text' />
              </div>
              <div className='mt-4'>
                <label className='text-sm' htmlFor='password'>
                  Password
                </label>
                <input className='mt-2 w-full rounded-md' id='password' type='text' />
              </div>
              <Link href='/projects'>
                <button className='mt-8 w-full rounded-md bg-[#13261D] py-3 text-white' type='submit'>
                  Login
                </button>
              </Link>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
