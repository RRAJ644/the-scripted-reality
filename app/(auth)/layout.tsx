import React from 'react'

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
