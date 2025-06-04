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
        className="font-sans text-sm font-medium"
        toastOptions={{
          classNames: {
            toast: "bg-white text-gray-800 border border-gray-200 shadow-lg rounded-lg",
            title: "font-semibold",
            description: "text-gray-600",
            actionButton: "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600",
            cancelButton: "bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300",
            success: "bg-green-50 border-green-200",
            error: "bg-red-50 border-red-200",
            warning: "bg-yellow-50 border-yellow-200",
            info: "bg-blue-50 border-blue-200"
          }
        }}
      />
    </AuthProvider>
  )
}

export default App