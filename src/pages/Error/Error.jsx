import React, { useEffect } from 'react'
import Footer from '../../components/Footer/Footer'
import './error.scss'
import { Link } from 'react-router-dom'
import Nav from '../../components/Nav/Nav'
const Error = () => {
  return (
    <>
        <Nav/>
        <div className="e-wrapper">
            <div className="e-card">
                <h1>Oops!</h1>
                <b>404 - PAGE NOT FOUND</b>
                <p>The page you are looking for might have been removed <br /> had its name changed or is temporarily unavailable</p>
                <button><Link to={'/'}>GO TO HOME PAGE</Link></button>
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Error