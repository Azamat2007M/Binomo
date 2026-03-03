  import { Routes, Route } from 'react-router-dom'
  import Home from './pages/Home/Home'
  import IntroDemo from './pages/IntroductionDemo/IntroDemo'
  import Login from './pages/Login/Login'
  import Register from './pages/Register/Register'
  import Profile from './pages/Profile/Profile'
  import Reyting from './pages/Binomers/Binomers'
  import CryptoDataFetcher from './pages/CryptoDataFetcher/CryptoDataFetcher'
  import Product from './pages/Product/Product'
  import Error from './pages/Error/Error'
  import Baned from './pages/Baned/Baned'
  import User from './pages/User/User'
  import Transaction from './pages/Transaction/Transaction'
  import Update from './pages/Update/Update'
  import Admin from './pages/Admin/Admin'
  import AdminUsers from './pages/AdminUsers/AdminUsers'
  import AdminAdmins from './pages/AdminAdmins/AdminAdmins'
  import Followers from './pages/Followers/Followers'
  import AdminTransaction from './pages/AdminTransaction/AdminTransaction'
  import AdminEdit from './pages/AdminEdit/AdminEdit'
  import { jwtDecode } from 'jwt-decode'
  import { useGetByIdQuery } from './redux/features/users'

  const App = () => {   
    const decoded = localStorage.getItem("Access")
      ? jwtDecode(localStorage.getItem("Access"))
      : {};
    const {data: user, isLoading, error} = useGetByIdQuery(decoded?.userId, {
        skip: !decoded?.userId
      });
    if (isLoading) return <div className='main-loading'><img src="/Loading.svg" alt="" /></div>
    if (error) return <Error/> 

    return (
      <>
          <Routes>
            <Route path='/' element={localStorage.getItem("Access") == null ? <Home /> : <CryptoDataFetcher />} />
            <Route path='/login' element={localStorage.getItem("Access") == null ? <Login /> : <Error />} />
            <Route path='/register' element={localStorage.getItem("Access") == null ? <Register /> : <Error />} />
            <Route path='/followers' element={localStorage.getItem("Access") == null ? <Error /> : <Followers />} />
            <Route path='/introductiondemo' element={<IntroDemo />} />
            <Route path='/profile' element={localStorage.getItem("Access") == null ? <Error /> : <Profile />} />
            <Route path='/binomers' element={localStorage.getItem("Access") == null ? <Error /> : <Reyting />} />
            <Route path='/ban' element={<Baned />} />
            <Route path='/transaction' element={localStorage.getItem("Access") == null ? <Error /> : <Transaction />} />
            <Route path="/coin/:symbol" element={localStorage.getItem("Access") == null ? <Error /> : <Product />} />
            <Route path="/user/:id" element={localStorage.getItem("Access") == null ? <Error /> : <User />} />
            <Route path="/update/:id" element={localStorage.getItem("Access") == null ? <Error /> : <Update />} />
            <Route path='/admin' element={user?.role === "admin" ? <Admin /> : <Error />} />
            <Route path='/admin-users' element={user?.role === "admin" ? <AdminUsers /> : <Error />} />
            <Route path='/admin-admins' element={user?.role === "admin" ? <AdminAdmins /> : <Error />} />
            <Route path='/admin-transaction' element={user?.role === "admin" ? <AdminTransaction /> : <Error />} />
            <Route path='/admin-edit/:id' element={user?.role === "admin" ? <AdminEdit /> : <Error />} />
            <Route path='*' element={<Error />} />
          </Routes>
      </>
    )
  }

  export default App