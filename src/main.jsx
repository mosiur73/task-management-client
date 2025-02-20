import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Provider/AuthProvider.jsx'
import { router } from './Utills/Routes.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
   <div className='max-w-screen-2xl mx-auto '>
   <RouterProvider router={router}></RouterProvider>
   </div>
   </AuthProvider>
  </StrictMode>,
)
