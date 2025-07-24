"use client"
import React, { useContext, useEffect, useState } from 'react'
import Header from './_components/Header';
import { GetAuthUserData } from '@/services/GlobalAPI';
import { useRouter } from 'next/navigation';
import { useConvex } from 'convex/react';
import { AuthContext } from '@/context/AuthContext';
import { api } from '@/convex/_generated/api';

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //define router to navigate user to sign in screen if token is invalid
  const router=useRouter();
  // define convex
  const convex=useConvex();
  const {user, setUser}=useContext(AuthContext)
  useEffect(()=>{
    CheckUseAuth();
  }, [])

  const CheckUseAuth=async()=>{
    const token=localStorage.getItem('user_token');
    //Get New Access Token
    const user= token && await GetAuthUserData(token);
    // console.log(user); not needed anymore
    if(!user?.email)
    {
      router.replace('/sign-in');
      return;
    }
        // Get User Info From Database
    try{
      const result=await convex.query(api.user.GetUser,{
        email:user?.email
      });
      // once we get the result
      console.log(result);
      // save result inside the hoop which is defined above
      setUser(result); // we are updatinng the auth context with the new info we are getting from the database. 
    }catch(e)
    {

    }
  }
  return (
    <div>
      <Header />
      {children}</div>
  )
}

export default Provider