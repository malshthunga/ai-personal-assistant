"use client"
import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import React, { useContext } from 'react';
import { GetAuthUserData } from "@/services/GlobalAPI";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { AuthContext } from '@/context/AuthContext';

function SignIn() {
  const CreateUser = useMutation(api.user.CreateUser);
  const { user, setUser } = useContext(AuthContext);


  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_token', tokenResponse.access_token);
      }
      const user = await GetAuthUserData(tokenResponse.access_token);

      console.log(user);

      const result = await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
      });

      setUser(result);
    },
    onError: errorResponse => console.log(errorResponse),
  });

  return (
    <div className='flex items-center flex-col justify-center h-screen'>
      <div className='flex flex-col items-center gap-5 border rounded-2xl p-10 shadow-md'>
        <Image src={'/logo.svg'} alt='logo' width={50} height={50} />
        <h2 className='text-2xl'>Sign in to AI Personal Assistant</h2>
        <Button onClick={() => googleLogin()}>Sign In With Gmail</Button>
      </div>
    </div>
  );
}

export default SignIn;
