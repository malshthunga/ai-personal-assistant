//server side to add sco, html
import React from 'react'

function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div>{children}</div>
    )
}

export default WorkspaceLayout