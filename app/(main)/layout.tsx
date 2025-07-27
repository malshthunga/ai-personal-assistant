//server side to add sco, html
import React from 'react'
import Provider from '../provider'


function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <div>
      <Provider>
        {/* {header} */}
        {children}
      </Provider>
</div>
  )
}

export default WorkspaceLayout