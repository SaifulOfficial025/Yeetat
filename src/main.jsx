import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {

  RouterProvider,
} from "react-router-dom";
import { router } from './routes/router';
import { DarkModeProvider } from './contexts/DarkModeContext';
import { AuthProvider } from './Context/AuthContext.jsx';
import { DataProvider } from './Context/DataContext.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <DataProvider>
        <DarkModeProvider>
          <RouterProvider router={router} />
        </DarkModeProvider>
      </DataProvider>
    </AuthProvider>
  </StrictMode>,
)
