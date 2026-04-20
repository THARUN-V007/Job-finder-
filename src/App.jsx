import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import AddApplication from './pages/Addapplication'
import Analytics from './pages/Analytics'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div style={{ padding: '30px 40px', minHeight: 'calc(100vh - 64px)' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/applications/new" element={<AddApplication />} />
          <Route path="/applications/:id" element={<AddApplication />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        toastStyle={{ borderRadius: '10px', fontWeight: '500' }}
      />
    </BrowserRouter>
  )
}