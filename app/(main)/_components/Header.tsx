'use client'
import React, { useContext } from 'react';
import Image from 'next/image';
import { AuthContext } from '@/context/AuthContext';

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-14 bg-white'>
      {/* Logo */}
      <Image
        src={'/logo.svg'}
        alt='logo'
        width={40}
        height={40}
      />

      {/* User Avatar */}
      {user?.picture ? (
        <Image
          src={user.picture}
          alt='User'
          width={40}
          height={40}
          className='rounded-full'
        />
      ) : (
        <p className='text-gray-600'>Guest</p>
      )}
    </div>
  );
}

export default Header;
