import { StrictMode } from 'react'
 import { createRoot } from 'react-dom/client'
// import './index.css'
import Login from './components/auth/Login.tsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from './components/admin/AdminDashboard.tsx';
import OddsManager from './components/admin/OddsManager.tsx';
import FileUploader from './components/admin/FileUploader.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


createRoot(document.getElementById('root')!).render(
  
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<AppLayout />} />

        <Route path="/oddsManager" element={<AppLayout title="Race Management">
  <OddsManager />
</AppLayout>} />

<Route path="/fileUploader" element={<AppLayout title="File Uploader">
  <FileUploader />
</AppLayout>} />
        
      </Routes>
     
    </BrowserRouter>
  ,
)
