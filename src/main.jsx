import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import {AuthProvider} from "./contexts/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <GoogleOAuthProvider clientId="135865424568-fsg4uepd61v3ot5mrfju5ukigfdf6jm2.apps.googleusercontent.com">
          <AuthProvider>
              <App />
          </AuthProvider>
      </GoogleOAuthProvider>
  </StrictMode>,
)
