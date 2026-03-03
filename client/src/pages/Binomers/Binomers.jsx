import { useEffect, useState } from 'react';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  useGetUserQuery,
} from '../../redux/features/users';
import './binomers.scss';
import Error from '../Error/Error';

const Binomers = () => {
  const navigate = useNavigate();
  const [binomers, setBinomers] = useState([]);
  const [choiceLeaderP, setChoiceLeaderP] = useState(0);
  const decoded = localStorage.getItem('Access')
    ? jwtDecode(localStorage.getItem('Access'))
    : {};
  const { data: buser, isLoading, error } = useGetUserQuery();
  const API = 'http://localhost:8000/'
  const [isFollowing, setIsFollowing] = useState(false); 

  const handleF = async (userid) => {
    try {      
      setIsFollowing(true); 

      const userToUpdate = buser.find(user => user?._id === userid);
      
      if (!userToUpdate) {
        console.error("User not found");
        setIsFollowing(false);
        return;
      }
      
      const similarEntry = buser.find(el => el.author_id === userid && el.user_id === decoded.userId);
      
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

      const userToUpdate = buser.find(user => user?._id === userid);
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
    if (buser) { 
      if (buser.useractived === false) {
        navigate("/ban")
      } else {
        navigate("/binomers")
      }
    }
  }, [buser, navigate])

  if (isLoading) return <h1>Loading...</h1>;
  if (error) return <Error/> 

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
                    <img src={`${API}${el?.image}`} alt="" />
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
                  <img src={`${API}${el?.image}`} alt="" />
                  <div className="bl-info">
                    <b>{el?.name}</b>
                    <p>Followers: {el?.followers}</p>
                  </div>
                </div>
                <p>Balance: {Math.round(el?.wallet)}$</p>
                <div className="b-buttons">
                  {binomers?.find((item) => item?.user_id === decoded?.userId &&  el?._id === item?.author_id) ? (
                    <button disabled={isFollowing} onClick={() => {
                      handleT(el?._id)
                    }} className='b-followed'>Followed</button>
                  ) : (el?._id === decoded?.userId) ? (
                    <button disabled={isFollowing} className='b-followed'>You</button>
                  ) : (
                    <button onClick={() => {
                      handleF(el?._id)
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

export default Binomers;
