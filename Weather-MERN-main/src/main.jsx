import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Weather from './projects/Weather/Weather.jsx'
import './index.css'
import './mobile.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Weather />
  },
  {
    path: '*',
    element: <>ERROR 404: Go to the right URL.</>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // </React.StrictMode>
)
