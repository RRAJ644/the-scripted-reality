import React from 'react'
import '../../globals.css'


const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className='min-h-screen flex items-center justify-center'>
      {children}
    </section>
  )
}

export default AuthLayout
