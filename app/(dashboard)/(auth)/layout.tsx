import React from 'react'
import '../../../globals.css'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <section>{children}</section>
      </body>
    </html>
  )
}

export default AuthLayout
