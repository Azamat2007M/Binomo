import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import './baned.scss'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

const Error = () => {
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
      alert(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []) // Remove dependency array to run only once on mount

   // Add user to dependency array

  if (user === null) { // Render loading state until user data is fetched
    return (
      <>
        <h1>Hello</h1>
      </>
    );
  }

  return (
    <>
      <Nav />
      <div className="b-wrapper">
        <div className="b-card">
          <h1>Oops!</h1>
          <b>403 - SORRY BUT YOUR ACCOUNT IS BLOCKED :(</b>
          <p>The resource is blocked for your account due to violation of our rules. <br /> You better log out of your account and create a new one.</p>
          <button onClick={() => {
            localStorage.removeItem("Access");
            navigate("/login");
          }}>LOG OUT FROM ACCOUNT</button>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Error
