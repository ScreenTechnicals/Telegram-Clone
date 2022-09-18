import Image from 'next/image'
import React from 'react'
import Logo from '../public/images/logo.png'
import GoogleLogo from '../public/images/google-logo.png'
import { auth, provider } from '../Firebase/init';
import { signInWithPopup } from 'firebase/auth';
const Login = () => {
  const createUser = async() => {
    await signInWithPopup(auth, provider);
  }
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <div className='flex items-center space-x-5'>
        <Image src={Logo} alt="" width={100} height={100} />
        <span className='text-6xl font-bold'>Telegram Web</span>
      </div>
      <div>
        <button className='flex items-center space-x-5 bg-[#fff] text-black px-6 py-3 my-20 rounded-full' onClick={createUser}>
          <Image src={GoogleLogo} alt="" width={40} height={40} />
          <span className='text-3xl font-semibold'>Login With Google</span>
        </button>
      </div>
    </div>
  )
}

export default Login