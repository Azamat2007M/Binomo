import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import './register.scss'

const Register = () => {
  const API = 'http://localhost:1234';
  const [pass, setPass] = useState(false);
  const navigate = useNavigate();

  const regEnter = async (e) => {
    e.preventDefault();
    await axios
      .post(`${API}/users/register`, {
        image: e.target[0].value,
        email: e.target[1].value,
        name: e.target[2].value,
        password: e.target[3].value,
        wallet: 10000,
        accepted: true,
        typewallet: "dollar",
        useractived: true,
        realwallet: false,
        followers: 0,
        enterConditional: true,
        role: "user",
        level: 1
      })
      .then((res) => {
        if (res.status === 201) {
          navigate('/login')
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };



  return (
    <>
      <Nav />
      <div className="r-wrapper">
        <div className="rw-card">
        <form onSubmit={regEnter}>
          <h1>Sign up</h1>
          <input type="text" placeholder="Image" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Name" required />
          <div className="pass">
            <input
              type={pass ? 'text' : 'password'}
              placeholder="Password"
              required
            />
            {pass ? (
              <div className='btnpass' onClick={() => setPass(!pass)} ><img className='d-img' src="https://www.svgrepo.com/show/380007/eye-password-hide.svg" alt="" /></div>
            ) : (
              <div className='btnpass' onClick={() => setPass(!pass)} ><img className='a-img' src="https://static.thenounproject.com/png/4334035-200.png" alt="" /></div>
            )}
          </div>
          <button type="submit" className="btnlogin">
            Submit
          </button>
          <div className="a-down">
            <b>Have account?</b>
            <Link to={'/login'}>Login</Link>
        </div>
        </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
