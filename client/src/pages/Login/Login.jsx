import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import './login.scss'

const Login = () => {
  const API = 'http://localhost:8000';
  const [pass, setPass] = useState(false);
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    status: 200,
    title:""
  })

  const logEnter = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/users/login`, {
        email: e.target[0].value,
        password: e.target[1].value,
      })      
      localStorage.setItem('Access', res.data.token);
      setStatus({
        status: true,
        title: "Login successful"
      });
      
      navigate('/introductiondemo');
    } catch (error) {
      setStatus({
        status: 400,
        title: error.response.data
      });      
      console.log(error);
    }
  };

  
  return (
    <>
      <Nav />
      <div className="r-wrapper">
        <div className="lw-card">
        <form onSubmit={logEnter}>
          <h1>Sign in</h1>
          <input type="email" placeholder="Email" className={status.status == 200 ? "status-s" : "status-e"} onChange={() => setStatus({status: 200, title: ""})} required />
          <div className="pass">
            <input type={pass ? "text" : "password"} className={status.status == 200 ? "status-s" : "status-e"} onChange={() => setStatus({status: 200, title: ""})} placeholder="Password" required />
            {pass ? (
              <div className='btnpass' onClick={() => setPass(!pass)} ><img className='d-img' src="https://www.svgrepo.com/show/380007/eye-password-hide.svg" alt="" /></div>
            ) : (
              <div className='btnpass' onClick={() => setPass(!pass)} ><img className='a-img' src="https://static.thenounproject.com/png/4334035-200.png" alt="" /></div>
            )}  
          </div>
          <div className={status.status == 200 ? "login-d" : "login-e"}>
            <b>{status.status == 200 ? null : status?.title}</b>
          </div>
          <button type="submit" className="btnlogin">
            Submit
          </button>
        </form>
        <div className="a-down-login">
            <b>Not account?</b>
            <Link to={'/register'}>Create</Link>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
