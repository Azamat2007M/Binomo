import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import Header from '../../components/Header/Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const Home = () => {
  const navigate = useNavigate()

  const decoded = localStorage.getItem("Access")
    ? jwtDecode(localStorage.getItem("Access"))
    : {};

  const [user, setUser] = useState(null); // Change initial state to null

  const getUser = async () => {
    try {
      const res = await axios.get(`https://binomo-backend.onrender.com/users/${decoded.user._id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []) // Remove dependency array to run only once on mount

  useEffect(() => {
    if (user !== null) { // Check if user data is available
      if (user.useractived === false) {
        navigate("/ban")
      }else if(localStorage.getItem("Access")){
        navigate(-1)
      } else {
        navigate("/")
      }
    }
  }, [user])
  return (
    <>
        <Nav/>
        <Header/>
        <Footer/>
    </>
  )
}

export default Home