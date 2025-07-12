"use client";
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider as NextThemesProvider } from "next-themes";

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.warn("🔑 [Provider] NEXT_PUBLIC_GOOGLE_CLIENT_ID =", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light" // "system" , "dark" , "light" == if you want dark mode it will enable dark mode vice versa
        enableSystem
        disableTransitionOnChange
      >
          <div>{children}</div>
      </NextThemesProvider>
    </GoogleOAuthProvider>

  )
}

export default Provider