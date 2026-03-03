import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav/Nav';
import './user.scss'
import { jwtDecode } from 'jwt-decode';
import { useGetByIdQuery, useGetUserQuery } from '../../redux/features/users';

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const API = 'http://localhost:8000/'
  const [binomers, setBinomers] = useState([]);
  const decoded = localStorage.getItem('Access')
    ? jwtDecode(localStorage.getItem('Access'))
    : {};
  const { data: busers, isLoading, error } = useGetUserQuery();
  const {data: buser} = useGetByIdQuery(id, {
    skip: !id
  });
  const {data: user} = useGetByIdQuery(decoded?.userId, {
    skip: !decoded?.userId
  });
  const [isFollowing, setIsFollowing] = useState(false);

  const handleF = async (userid) => {
    try {      
      setIsFollowing(true); 

      const userToUpdate = busers.find(user => user?._id === userid);
      
      if (!userToUpdate) {
        console.error("User not found");
        setIsFollowing(false);
        return;
      }
      
      const similarEntry = busers.find(el => el.author_id === userid && el.user_id === decoded.userId);
      
      if (!similarEntry) {        
        await axios.patch(`${API}users/${userid}`, {
          followers: userToUpdate.followers + 1 
        });
        
        await axios.post(`${API}binomers`, {
          user_id: decoded.userId, 
          author_id: userid, 
        });
      }
      window.location.reload()
    } catch (error) {
      console.error("Error updating user:", error);
      setIsFollowing(false);
    }
  }
  const handleT = async (userid) => {
    try {
      setIsFollowing(true); 

      const userToUpdate = busers.find(user => user?._id === userid);
      console.log(userToUpdate);
      
      if (!userToUpdate) {
        console.error("User not found");
        setIsFollowing(false);
        return;
      }

      const response = await axios.get(`${API}binomers`)

      const similarEntry = response.data.find(el => el.author_id === userid && el.user_id === decoded.userId);

      if (similarEntry) {
        console.log(similarEntry._id);
        
        await axios.patch(`${API}users/${userid}`, {
          followers: userToUpdate.followers - 1 
        });
        await axios.delete(`${API}binomers/${similarEntry._id}`);
      }

      window.location.reload()
    } catch (error) {
      console.error("Error updating user:", error);
      setIsFollowing(false); 
    }
  }

  const getBinomers = async () => {
    try {
      const res = await axios.get(`${API}binomers`);
      setBinomers(res.data)
    } catch (err) {
      console.log(err);
    }
  };
  
  
  useEffect(() => {
    getBinomers()
    if (user) { 
      if (user.useractived === false) {
        navigate("/ban")
      } else {
        navigate(`/user/${id}`)
      }
    }
  }, [user, navigate])

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <Error/> 

  return (
    <>
      <Nav/>
          <section className="u-wrapper-f">
              <div className="case">
                  <div className="u-wrapper">
                    <div className="u-card">
                    {buser?.level === 1 ? (
                          <div className="p-image">
                            <div className="p-image1">
                              <img src={`http://localhost:8000/${buser?.image}`} alt="" />
                            </div>
                          </div>
                        ) : buser?.level === 2 ? (
                          <div className="p-image">
                            <div className="p-image2">
                              <img src={`http://localhost:8000/${buser?.image}`} alt="" />
                            </div>
                          </div>
                        ) : buser?.level === 3 ? (
                          <div className="p-image">
                            <div className="p-image3">
                              <img src={`http://localhost:8000/${buser?.image}`} alt="" />
                            </div>
                          </div>
                        ) : buser?.level === 4 ? (
                          <div className="p-image">
                            <div className="p-image4">
                              <img src={`http://localhost:8000/${buser?.image}`} alt="" />
                            </div>
                          </div>
                        ) : buser?.level >= 5 ? (
                          <div className="p-image">
                            <div className="p-image5">
                              <img src={`http://localhost:8000/${buser?.image}`} alt="" />
                            </div>
                          </div>
                        ) : null}
                        <div className="u-line">
                          <h2>Name:</h2>
                          <h3>{buser?.name}</h3>
                        </div>
                        <div className="u-line">
                          <h2>Balance:</h2>
                          <h3>{Math.round(buser?.wallet)}$</h3>
                        </div>
                        <div className="u-line">
                          <h2>Level:</h2>
                          {buser?.level === 1 ? (
                            <h2 className='p-act'>Bronze</h2>
                          ) : buser?.level === 2 ? (
                            <h2 className='p-act'>Silver</h2>
                          ) : buser?.level === 3 ? (
                            <h2 className='p-act'>Platina</h2>
                          ) : buser?.level === 4 ? (
                            <h2 className='p-act'>Legendary</h2>
                          ) : buser?.level >= 5 ? (
                            <h2 className='p-act'>KokSultan</h2>
                          ) : null}
                        </div>
                        {binomers?.find((item) => item?.buser_id === decoded?.buserId &&  buser?._id === item?.author_id) ? (
                          <button onClick={() => {
                            handleT(buser?._id)
                          }} disabled={isFollowing} className='b-followed'>Followed</button>
                        ) : (buser?._id === decoded?.userId) ? (
                          <button disabled={isFollowing} className='b-followed'>You</button>
                        ) : (
                          <button onClick={() => {
                            handleF(buser?._id)
                          }} disabled={isFollowing} className='b-follow'>Follow</button>
                        )}
                    </div>
                  </div>
              </div>
          </section>
        <Footer/>
    </>
  )
}

export default User