import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import { RiBaseStationLine } from "react-icons/ri";
import { HiStatusOffline } from "react-icons/hi";
import { jwtDecode } from "jwt-decode";
import './profile.scss'
const Profile = () => {
  const navigate = useNavigate()

  const decoded = localStorage.getItem("Access")
  ? jwtDecode(localStorage.getItem("Access"))
  : {};
  const [isOnline, setOnline] = useState(false)
   const [user, setUser] = useState([]);

  const getUser = async () => {
      await axios
          .get(`https://binomo-backend.onrender.com/users/${decoded.user._id}`)
          .then((res) => {
            setUser(res.data);
          })
          .catch((err) => {
              alert(err);
          })
  }

  useEffect(() => {
    getUser()
    if (user.useractived == true) {
      navigate('/profile')
    }else if(user.useractived == false){
      navigate('/ban')
    }else if(!localStorage.getItem("Access")){
      navigate('/')
    }
    function handleOnlineStatus() {
      setOnline(true)
    }
    function handleOfflineStatus() {
      setOnline(false)
    }
    window.addEventListener("online", handleOnlineStatus)
    window.addEventListener("onffine", handleOfflineStatus)

    return() => {
      window.addEventListener("online", handleOnlineStatus)
      window.addEventListener("onffine", handleOfflineStatus)
    }
  }, []);
  return (
    <>
      <Nav />
      {localStorage.getItem('Access') ? (
            <div className="all">
            <div className="profile1">
              {user?.level === 1 ? (
                  <div className="p-image p-image1">
                  <img src={user?.image} alt="" />
                  </div>
                ) : user?.level === 2 ? (
                  <div className="p-image p-image2">
                  <img src={user?.image} alt="" />
                  </div>
                ) : user?.level === 3 ? (
                  <div className="p-image p-image3">
                  <img src={user?.image} alt="" />
                  </div>
                ) : user?.level === 4 ? (
                  <div className="p-image p-image4">
                  <img src={user?.image} alt="" />
                  </div>
                ) : user?.level >= 5 ? (
                  <div className="p-image p-image5">
                  <img src={user?.image} alt="" />
                  </div>
                ) : null}
              
              <div className="pl-top">
              <div className="pt-line">
                <h1>Name:</h1>
                <h2 className='p-act'>{user.name}</h2>
              </div>
              <div className="pt-line">
                <h1>Balance:</h1>
                <h2 className='p-act'>{Number(user.wallet).toFixed(2)}$</h2>
              </div>
              </div>
              <div className="p-line">
                <h2>Email:</h2>
                <h2 className='p-act'>{user.email}</h2>
              </div>
              <div className="p-line">
                <h2>Level:</h2>
                {user?.level === 1 ? (
                  <h2 className='p-act'>Bronze</h2>
                ) : user?.level === 2 ? (
                  <h2 className='p-act'>Silver</h2>
                ) : user?.level === 3 ? (
                  <h2 className='p-act'>Platina</h2>
                ) : user?.level === 4 ? (
                  <h2 className='p-act'>Legendary</h2>
                ) : user?.level >= 5 ? (
                  <h2 className='p-act'>KokSultan</h2>
                ) : null}
              </div>
              <div className="pler-line">
              <div className="p-line">
                <h2>Folowers:</h2>
                <h2 className='p-act'>{user.followers}</h2>
              </div>
                  <button
                    className="editbtn"
                    onClick={() => navigate('/binomers')}
                  >
                    Binomers
                  </button>
              </div>
              <Link to={`/update/${decoded?.user?._id}`}>
                <div className="close">
                  <button
                    className="editbtn"
                  >
                    Edit
                  </button>
                </div>
              </Link>
              <Link to={'/'}>
                <div className="close">
                  <button
                    className="closebtn"
                    onClick={() => {
                        localStorage.removeItem("Access");
                        navigate("/login");
                      }}    
                  >
                    Log out
                  </button>
                </div>
              </Link>
            </div>
          </div>
      ) : null}
      <Footer />
    </>
  );
};

export default Profile;
