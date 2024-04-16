import React from 'react'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Registerform from './Component/Registerform'
import Login from './Component/Login'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Component/Home'
import Navbar from './Component/Navbar'
import { useSelector } from 'react-redux'
import { loaduser } from './redux/apiCall'
import Userdashboard from './Component/Userdashboard'
import Members from './Component/Members'
import Notfound from './Component/Notfound'
import Addtask from './Component/Addtask'
import Loader from './Component/cards/Loader'
const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loaduser())
  }, [dispatch])

  const isLogin = useSelector((state) => state.user.isLogin)
  const isLoading = useSelector((state) => state.user.loading)

  const Required = ({ children }) => {
    if (isLoading == true) {
      <Loader />
    } else {
      return isLogin ? children : <Navigate to="/" />
    }
  }

  return (

    <BrowserRouter>
      {isLogin && <Navbar />}
      <Routes>
        <Route path='/' element={isLogin ? <Navigate to="/dashboard" /> : < Login />} />
        <Route path='*' element={<Notfound />} />
        <Route path='/register' element={<Registerform />} />
        <Route path='/dashboard' element={<Required><Userdashboard /></Required>} />
        <Route path='/member/:id' element={<Required><Members /></Required>} />
        <Route path='/task/:id' element={<Required><Home /></Required>} />
        <Route path='/task/create' element={<Required><Addtask /></Required>} />

      </Routes>

    </BrowserRouter>
  )
}

export default App