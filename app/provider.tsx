"use client";
import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ConvexProvider, ConvexReactClient } from "convex/react";


function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <ConvexProvider client={convex}>{children}
        <NextThemesProvider
          attribute="class"
          defaultTheme="light" // "system" , "dark" , "light" == if you want dark mode it will enable dark mode vice versa
          enableSystem
          disableTransitionOnChange
        >
            <div>{children}</div>
        </NextThemesProvider>
      </ConvexProvider>
    </GoogleOAuthProvider>

  )
}

export default Provider