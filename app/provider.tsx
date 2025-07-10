"use client side"
import React from 'react'
import { ThemeProvider as NextThemesProvider } from "next-themes"

function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark" // "system" , "dark" , "light" == if you want dark mode it will enable dark mode vice versa
      enableSystem
      disableTransitionOnChange
    >
        <div>{children}</div>
    </NextThemesProvider>

  )
}

export default Provider