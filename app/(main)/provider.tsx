" use client"
import React, {useEffect, useContext} from 'react'
import Header from './_components/Header';
import { GetAuthUserData } from '@/services/GlobalAPI';
import { useRouter } from 'next/router';
import { AuthContext } from "@/context/AuthContext";
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { GetUser } from '@/convex/user';

interface ProviderProps {
  children: React.ReactNode;
}

function Provider({ children }: ProviderProps){
  const router = useRouter();
  const convex=useConvex();
  const { user, setUser } = useContext(AuthContext);
  
  useEffect(() => {
    CheckUseAuth();
  }, []);

async function CheckUseAuth(){
    const token = localStorage.getItem('user_token');
    // Get New Access Token
    //If we are not getting the user then navigate user to sign in screen 
    if (!token) {
      router.replace("/sign-in");
      return;
    }

    const authUser = await GetAuthUserData(token);
     //if token is available then face the data
    if(!user?.email)
    {
      router.replace('/sign-in')
      return ;
    }
    //Get User Info from Database
    try{
      const dbUser =await convex.query(api.GetUser,{email:authUser.email});

      if (!dbUser) {
        router.replace("/sign-in")
        return;
      }

      setUser(dbUser);
    } catch (err) {
      console.error("Convex query failed:", err);
      router.replace("/sign-in")
    }
}

return (
  <div>
    <header />
    {children}
  </div>
);
}

export default Provider