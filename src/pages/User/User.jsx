import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Nav from '../../components/Nav/Nav';
import './user.scss'
import { jwtDecode } from 'jwt-decode';
import { useGetUserQuery, useUpdateUserMutation } from '../../redux/features/users';

const User = () => {
    const [product, setProduct] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [binomers, setBinomers] = useState([]);
    const [choiceLeaderP, setChoiceLeaderP] = useState(0);
    const [isFollowed, setIsFollowed] = useState('');
    const decoded = localStorage.getItem('Access')
      ? jwtDecode(localStorage.getItem('Access'))
      : {};
    const [updateUser] = useUpdateUserMutation();
    const { data: buser, isLoading } = useGetUserQuery();
  
  
    const [isFollowing, setIsFollowing] = useState(false); // State to track if the button is disabled
  
    const handleF = async (userid) => {
      try {
        setIsFollowing(true); // Disable the button
  
        // Find the user object based on the userid
        const userToUpdate = buser.find(user => user?._id === userid);
        if (!userToUpdate) {
          console.error("User not found");
          setIsFollowing(false); // Enable the button
          return;
        }
  
        // GET request to fetch data from the second endpoint
        const response = await axios.get(`http://localhost:7777/binomers`)
  
        // Check if any entry in the response data matches the conditions
        const similarEntry = response.data.find(el => el.author_id === userid && el.user_id === decoded.user._id);
  
        if (!similarEntry) {
          // If matched, perform the PATCH request to update followers count
          await axios.patch(`https://binomo-backend.onrender.com/users/${userid}`, {
            followers: userToUpdate.followers + 1 // Increment followers count
          });
  
          // POST request to add a follow entry on the second endpoint
          await axios.post(`http://localhost:7777/binomers`, {
            user_id: decoded.user._id, // Current user's ID
            author_id: userid, // ID of the user being followed
          });
        }
  
        window.location.reload()
        // Reload the page after successful update
      } catch (error) {
        // Handle errors
        console.error("Error updating user:", error);
        alert("Error updating user. Please try again.");
        setIsFollowing(false); // Enable the button in case of error
      }
    }
  
    const handleT = async (userid) => {
      try {
        setIsFollowing(true); // Disable the button
  
        // Find the user object based on the userid
        const userToUpdate = buser.find(user => user?._id === userid);
        if (!userToUpdate) {
          console.error("User not found");
          setIsFollowing(false); // Enable the button
          return;
        }
  
        // GET request to fetch data from the second endpoint
        const response = await axios.get(`http://localhost:7777/binomers`)
  
        // Check if any entry in the response data matches the conditions
        const similarEntry = response.data.find(el => el.author_id === userid && el.user_id === decoded.user._id);
  
        if (similarEntry) {
          // If matched, perform the PATCH request to update followers count
          await axios.patch(`https://binomo-backend.onrender.com/users/${userid}`, {
            followers: userToUpdate.followers - 1 // Increment followers count
          });
          // POST request to add a follow entry on the second endpoint
          await axios.delete(`http://localhost:7777/binomers/${similarEntry.id}`);
        }
  
        window.location.reload()
        // Reload the page after successful update
      } catch (error) {
        // Handle errors
        console.error("Error updating user:", error);
        alert("Error updating user. Please try again.");
        setIsFollowing(false); // Enable the button in case of error
      }
    }

    function getBinomers() {
      axios.get("http://localhost:7777/binomers")
        .then((res) => setBinomers(res.data))
        .catch((err) => alert(err))
    }
  
  
  
    
  
    const getUsers = async () => {
        await axios.get(`https://binomo-backend.onrender.com/users/${id}`)
          .then((res) => {
            setProduct(res.data);
          })
          .catch((err) => {
            alert(err);
          })
      }
      useEffect(() => {
        getBinomers()
        getUsers();
        if (buser) { // Check if user data is available
          if (buser.useractived === false) {
            navigate("/ban")
          } else {
            navigate(`/user/${id}`)
          }
        }
      }, [buser, navigate])
    
      if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <Nav/>
          <section className="u-wrapper-f">
              <div className="case">
                  <div className="u-wrapper">
                    <div className="u-card">
                    {product?.level === 1 ? (
                  <div className="p-image p-image1">
                  <img src={product?.image} alt="" />
                  </div>
                ) : product?.level === 2 ? (
                  <div className="p-image p-image2">
                  <img src={product?.image} alt="" />
                  </div>
                ) : product?.level === 3 ? (
                  <div className="p-image p-image3">
                  <img src={product?.image} alt="" />
                  </div>
                ) : product?.level === 4 ? (
                  <div className="p-image p-image4">
                  <img src={product?.image} alt="" />
                  </div>
                ) : product?.level >= 5 ? (
                  <div className="p-image p-image5">
                  <img src={product?.image} alt="" />
                  </div>
                ) : null}
                        <div className="u-line">
                          <h2>Name:</h2>
                          <h3>{product?.name}</h3>
                        </div>
                        <div className="u-line">
                          <h2>Balance:</h2>
                          <h3>{Math.round(product?.wallet)}$</h3>
                        </div>
                        <div className="u-line">
                          <h2>Level:</h2>
                          {product?.level === 1 ? (
                            <h2 className='p-act'>Bronze</h2>
                          ) : product?.level === 2 ? (
                            <h2 className='p-act'>Silver</h2>
                          ) : product?.level === 3 ? (
                            <h2 className='p-act'>Platina</h2>
                          ) : product?.level === 4 ? (
                            <h2 className='p-act'>Legendary</h2>
                          ) : product?.level >= 5 ? (
                            <h2 className='p-act'>KokSultan</h2>
                          ) : null}
                        </div>
                        {binomers?.find((item) => item?.user_id === decoded?.user?._id &&  product?._id === item?.author_id) ? (
                          <button onClick={() => {
                            handleT(product?._id)
                            setIsFollowed(product?._id)
                          }} disabled={isFollowing} className='b-followed'>Followed</button>
                        ) : (product?._id === decoded?.user?._id) ? (
                          <button disabled={isFollowing} className='b-followed'>You</button>
                        ) : (
                          <button onClick={() => {
                            handleF(product?._id)
                            setIsFollowed(product?._id)
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