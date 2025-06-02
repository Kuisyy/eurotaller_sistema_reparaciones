import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <Toaster 
        position="top-right" 
        richColors 
        expand={true}
        closeButton
        theme="light"
      />
    </>
  )
}

export default App