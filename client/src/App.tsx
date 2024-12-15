import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import ProtectedRoutes from './components/ProtectedRoutes'
import HomeProfile from './pages/Home'
import RegisterForm from './pages/Register'
import { setNavigate } from './lib/navigation'
import Settings from './pages/Settings'

export default function App() {
  const navigate = useNavigate()
  setNavigate(navigate)

  return (
    <Routes >
      <Route path='/' element={<ProtectedRoutes />}>
        <Route index element={<HomeProfile />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<RegisterForm />} />
    </Routes>
  )
}
