"use client"
import {Button} from '@/components/ui/button'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Image from 'next/image';
import React from 'react'
import  { GetAuthUserData } from "@/services/GlobalAPI";

function SignIn() {
    
const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    if (typeof window !== undefined) {
        localStorage.setItem('user_token', tokenResponse.access_token);
    }
    const user=GetAuthUserData(tokenResponse.access_token);
    console.log(user);
  },
  onError: errorResponse => console.log(errorResponse),
});

    return (
        <div className='flex items-center flex-col justify-center h-screen' >
            <div className='flex flex-col items-center gap-5 border rounded-2xl p-10 shadown-md'>
                <Image src={'/logo.svg'} alt='logo'
                    width={50} 
                    height={50}
                />
                <h2 className='text-2xl'> sign in to AI  Personal Assistant </h2>
                <Button onClick={()=>googleLogin()}> Sign In With Gmail </Button>
            </div>
        </div>
    )
}

export default SignIn