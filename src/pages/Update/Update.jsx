import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './update.scss'

const Update = () => {
  const [pass, setPass] = useState(false);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams()
  const getUser = async () => {
    await axios
        .get(`https://binomo-backend.onrender.com/users/${id}`)
        .then((res) => {
          setUser(res.data);
        })
        .catch((err) => {
            alert(err);
        })
}
  const UpdateProduct = async (e) => {
    e.preventDefault()
    await axios
        .patch(`https://binomo-backend.onrender.com/users/${id}`, {
          image: e.target[0].value,
          name: e.target[1].value,
        })
        .then(() => {
            navigate('/profile')
        })
        .catch((err) => {
            alert(err)
        })
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <>
        <Nav/>  
        <section>
          <div className="r-wrapper">
            <div className="u-card">
            <form onSubmit={UpdateProduct}>
          <h1>Editor</h1>
          <input type="text" placeholder="Image" name={user?.image} required />
          <input type="text" placeholder="Name" name={user?.name} required />
          <button type="submit" className="btnlogin">
            Submit
          </button>
          <div className="a-down">
            <b>Don't want to edit?</b>
            <Link to={'/profile'}>Back</Link>
        </div>
        </form>
            </div>
          </div>
        </section>
        <Footer/>
    </>
  )
}

export default Update