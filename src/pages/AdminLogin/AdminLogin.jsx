import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import './adminlogin.scss'

const AdminLogin = () => {
  const API = 'http://localhost:1234';
  const [pass, setPass] = useState(false);
  const navigate = useNavigate();

  const logEnter = async (e) => {
    e.preventDefault();
    await axios
      .post(`${API}/users/login`, {
        email: e.target[0].value,
        password: e.target[1].value,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('Access', res.data.token);
          navigate('/admin');
          window.location.reload()
        } else {
          console.log(res.data.message);
          alert("Email or Password incorrect")
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
        <div className="lw-card">
        <form onSubmit={logEnter}>
          <h1>Sign in</h1>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="btnlogin">
            Submit
          </button>
        </form>
        <div className="a-down">
            <b>Not account?</b>
            <Link to={'/admin-register'}>Create</Link>
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminLogin;