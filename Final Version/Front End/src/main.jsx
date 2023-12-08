import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      {/* <QueryClientProvider client={queryClient}> */}
      {/* <DarkModeProvider> */}
        <RouterProvider router={router} />
        {/* </DarkModeProvider> */}
      {/* </QueryClientProvider>       */}
    </AuthProvider>
  </React.StrictMode>,
)
