import React, { useEffect, useState } from 'react';
import './reyting.scss';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../redux/features/users';

const Reyting = () => {
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



  useEffect(() => {
    getBinomers()
    if (buser) { // Check if user data is available
      if (buser.useractived === false) {
        navigate("/ban")
      } else {
        navigate("/reyting")
      }
    }
  }, [buser, navigate])

  if (isLoading) return <h1>Loading...</h1>;


  return (
    <>
      <Nav />
      <div className="r-wrapper">
        <div className="r-top">
          <h1>Binomo for everyone</h1>
          <p>
            Learn more about Binomo's top traders. Get information, learn their{' '}
            <br />
            strategies and improve your trading results.
          </p>
        </div>
        <div className="choice-panel">
          <button
            onClick={() => setChoiceLeaderP(0)}
            className={choiceLeaderP === 1 ? null : 'b-active'}
          >
            Binomer
          </button>
          <button
            onClick={() => setChoiceLeaderP(1)}
            className={choiceLeaderP === 0 ? null : 'b-active'}
          >
            Leaderboard
          </button>
        </div>
        {choiceLeaderP === 1 ? (
          <div className="r-card">
            <h1>Top players</h1>
            {buser
              .slice(0, 20)
              .sort((a, b) => a.wallet - b.wallet)
              .reverse()
              .map((el) => {
                return (
                  <Link to={`/user/${el?._id}`} className="r-line" key={el?._id}>
                    <img src={el?.image} alt="" />
                    <b>{el?.name}</b>
                    <p>{Math.round(el?.wallet)}$</p>
                  </Link>
                );
              })}
          </div>
        ) : (
          <div className="b-card">
            {buser.slice(0, 50).map((el) => (
              <div className="b-line" key={el?._id}>
                <div className="bl-top">
                  <img src={el?.image} alt="" />
                  <div className="bl-info">
                    <b>{el?.name}</b>
                    <p>Followers: {el?.followers}</p>
                  </div>
                </div>
                <p>Balance: {Math.round(el?.wallet)}$</p>
                <div className="b-buttons">
                  {binomers?.find((item) => item?.user_id === decoded?.user?._id &&  el?._id === item?.author_id) ? (
                    <button disabled={isFollowing} onClick={() => {
                      handleT(el?._id)
                      setIsFollowed(el?._id)
                    }} className='b-followed'>Followed</button>
                  ) : (el?._id === decoded?.user?._id) ? (
                    <button disabled={isFollowing} className='b-followed'>You</button>
                  ) : (
                    <button onClick={() => {
                      handleF(el?._id)
                      setIsFollowed(el?._id)
                    }} disabled={isFollowing} className='b-follow'>Follow</button>
                  )}
                  <Link to={`/user/${el?._id}`} className='b-view'>View</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Reyting;
