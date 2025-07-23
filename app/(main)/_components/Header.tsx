"use client"

import React, { useContext } from 'react'
import Image from 'next/image'
import { AuthContext } from '@/context/AuthContext';
import { GetAuthUserData } from '@/services/GlobalAPI';

function Header() {
  const {user}=useContext(AuthContext);
  return user && ( //display only if user info is available

    <div className='p-3 shadow-sm flex justify-between items-center px-14'>
        <Image src={'/logo.svg'} alt='logo'
        width={40}
        height={40}
        />

        <Image src={user?.image} alt='logo'
        width={40}
        height={40}
        />
    </div>
  )
}

export default Header