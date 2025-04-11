import React from 'react'
import '../../(app)/global.css'

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
