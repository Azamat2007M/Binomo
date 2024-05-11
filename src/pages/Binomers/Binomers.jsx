import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../redux/features/users';
import './binomers.scss'

const Binomers = () => {
    const [choiceBinomers, setChoiceBinomers] = useState(0);
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
        navigate("/binomers")
      }
    }
  }, [buser, navigate])

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
        <Nav/>
        <div className="r-wrapper">
            <div className="r-top">
                <h1>Binomers</h1>
                <p>
            Learn more about Binomo's top traders. Get information, learn their{' '}
            <br />
            strategies and improve your trading results.
          </p>
            </div>
            <div className="choicer-panel">
          <button
            onClick={() => setChoiceBinomers(0)}
            className={choiceBinomers === 1 ? null : 'b-active'}
          >
            Followers
          </button>
          <button
            onClick={() => setChoiceBinomers(1)}
            className={choiceBinomers === 0 ? null : 'b-active'}
          >
            Binomers
          </button>
        </div>
        {choiceBinomers === 1 ? (
          <div className="r-card">
          <h1>Followed Channels</h1>
          {binomers
            .filter(item => item.user_id === decoded.user._id) // Filter binomers array to include only followed users
            .map((el) => {
              return (
                <Link to={`/user/${el.author_id}`} className="r-line" key={el._id}>
                  <img src={buser.filter((elements) => elements._id === el.author_id).map((elements) => elements.image)} alt="" />
                  <b>{buser.filter((elements) => elements._id === el.author_id).map((elements) => elements.name)}</b>
                  <p>{Math.round(buser.filter((elements) => elements._id === el.author_id).map((elements) => elements.wallet))}$</p>
                </Link>
              );
            })}
        </div>
        ) : (
          <div className="b-card">
            {binomers
            .filter(item => item.author_id === decoded.user._id) // Filter binomers array to include only followed users
            .map((el) => {
              return (
                <div className="b-line" key={el._id}>
                    {buser.filter((elements) => elements._id === el.user_id).map((elements) => {
                      return(
                        <div className="some">
                        <div className="bl-top">
                          <img src={elements?.image} alt="" />
                          <div className="bl-info">
                            <b>{elements?.name}</b>
                            <p>Followers: {elements?.followers}</p>
                          </div>
                        </div>
                        <p>Balance: {Math.round(elements?.wallet)}$</p>
                        <div className="b-buttons">
                          <Link to={`/user/${el.user_id}`} style={{width: '100%'}} className='b-view'>View</Link>
                        </div>
                        </div>
                      )
                    })}
                </div>
              )
            })}
          </div>
        )}
        </div>
        <Footer/>
    </>
  )
}

export default Binomers