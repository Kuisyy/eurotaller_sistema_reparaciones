import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'sonner';

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" richColors closeButton />
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App