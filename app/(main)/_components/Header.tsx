'use client'
import React, { useContext } from 'react'
import Image from 'next/image'
import { AuthContext } from '@/context/AuthContext'

function Header() {
  const {user}= useContext(AuthContext);
  return user && (
    <div className='p-3 shadow-sm'> 
      <Image src={'/logo.svg'} alt='logo'
        width={40}
        height={40}/>

      {user?.picture && <Image src={user?.picture} alt='logo'
        width={40}
        height={40}/>}
    </div>
  )
}

export default Header