  import React from 'react'
  import { Routes, Route } from 'react-router-dom'
  import Home from './pages/Home/Home'
  import IntroDemo from './pages/IntroductionDemo/IntroDemo'
  import Login from './pages/Login/Login'
  import Register from './pages/Register/Register'
  import Chart from './pages/tradingbiew/Chart'
  import Profile from './pages/Profile/Profile'
  import Reyting from './pages/Reyting/Reyting'
  import CryptoDataFetcher from './pages/CryptoDataFetcher/CryptoDataFetcher'
  import CryptoChart from './pages/CryptoChart/CryptoChart'
  import Product from './pages/Product/Product'
  import Error from './pages/Error/Error'
  import Baned from './pages/Baned/Baned'
  import User from './pages/User/User'
  import Transaction from './pages/Transaction/Transaction'
  import Update from './pages/Update/Update'
  import Binomers from './pages/Binomers/Binomers'
  import AdminRegister from './pages/AdminRegister.jsx/AdminRegister'
  import AdminLogin from './pages/AdminLogin/AdminLogin'
  import Admin from './pages/Admin/Admin'
  import AdminUsers from './pages/AdminUsers/AdminUsers'
  import AdminAdmins from './pages/AdminAdmins/AdminAdmins'
  import AdminTransaction from './pages/AdminTransaction/AdminTransaction'
import AdminEdit from './pages/AdminEdit/AdminEdit'

  const App = () => {
    
    return (
      <>
        {localStorage.getItem('Access') ? (
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/admin-register' element={<AdminRegister />} />
          <Route path='/admin-users' element={<AdminUsers />} />
          <Route path='/register' element={<Register />} />
          <Route path='/binomers' element={<Binomers />} />
          <Route path='/introductiondemo' element={<IntroDemo />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/reyting' element={<Reyting />} />
          <Route path='/chart' element={<Chart />} />
          <Route path='/ban' element={<Baned />} />
          <Route path='/transaction' element={<Transaction />} />
          <Route path='*' element={<Error />} />
          <Route path='/' element={<CryptoDataFetcher />} />
          <Route path='/coinchart' element={<CryptoChart />} />
          <Route path="/coin/:symbol" element={<Product />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/update/:id" element={<Update />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin-login' element={<AdminLogin />} />
          <Route path='/admin-admins' element={<AdminAdmins />} />
          <Route path='/admin-transaction' element={<AdminTransaction />} />
          <Route path='/admin-edit/:id' element={<AdminEdit />} />
        </Routes>
        ) : (
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/admin-register' element={<AdminRegister />} />
            <Route path='/admin-login' element={<AdminLogin />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/introductiondemo' element={<IntroDemo />} />
            <Route path='/admin-users' element={<AdminUsers />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='*' element={<Error />} />
          </Routes>     
        )}
      </>
    )
  }

  export default App