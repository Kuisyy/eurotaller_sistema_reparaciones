import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './context/AuthContext'
import { Toaster } from 'sonner'
import { AnimatePresence } from 'framer-motion'

const App = () => {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <RouterProvider router={router} />
      </AnimatePresence>
      <Toaster 
        position="top-right" 
        richColors 
        expand={true}
        closeButton
        theme="light"
        visibleToasts={6}
        duration={4000}
      />
    </AuthProvider>
  )
}

export default App