import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import './adminregister.scss'

const AdminRegister = () => {
  const API = 'http://localhost:1234';
  const [pass, setPass] = useState(false);
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const regEnter = async (e) => {
    e.preventDefault();
    if (pin === '#8222') { // Check if pin is 'root'
      try {
        const response = await axios.post(`${API}/users/register`, {
          image: e.target[0].value,
          email: e.target[1].value,
          name: e.target[2].value,
          password: e.target[4].value,
          wallet: 10000,
          accepted: true,
          typewallet: "dollar",
          useractived: true,
          realwallet: false,
          followers: 0,
          enterConditional: true,
          role: "admin",
          level: 1
        });
  
        if (response.status === 201) {
          navigate('/admin-login');
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    } else {
      alert('Error: Pin incorrect');
    }
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
          <input
            onChange={(e) => setPin(e.target.value)}
            placeholder="Pin"
            required
            />
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
            <Link to={'/admin-login'}>Login</Link>
        </div>
        </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminRegister;
