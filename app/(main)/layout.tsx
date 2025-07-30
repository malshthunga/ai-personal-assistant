//server side to add sco, html
import React from 'react'
import Provider from '../provider'
import Header from './_components/Header';


function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div>
      <Provider>
        <Header />
        {children}
      </Provider>
</div>
  )
}

export default WorkspaceLayout