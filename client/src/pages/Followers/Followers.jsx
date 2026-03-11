import { useEffect, useState } from 'react'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  useGetUserQuery,
} from '../../redux/features/users';
import './followers.scss'
import emptyImg from '../../assets/b-empty.png'

const Followers = () => {
  const [choiceBinomers, setChoiceBinomers] = useState(0);
  const navigate = useNavigate();
  const [binomers, setBinomers] = useState([]); 
  const decoded = localStorage.getItem('Access')
    ? jwtDecode(localStorage.getItem('Access'))
    : {};
  const { data: buser, isLoading, error } = useGetUserQuery();


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

      const response = await axios.get(`http://localhost:7777/binomers`)

      const similarEntry = response.data.find(el => el.author_id === userid && el.user_id === decoded.user._id);

      if (!similarEntry) {
        await axios.patch(`http://localhost:8000/users/${userid}`, {
          followers: userToUpdate.followers + 1
        });

        await axios.post(`http://localhost:7777/binomers`, {
          user_id: decoded.user._id, 
          author_id: userid, 
        });
      }

      window.location.reload()
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user. Please try again.");
      setIsFollowing(false); 
    }
  }
  const handleT = async (userid) => {
    try {
      setIsFollowing(true); 

      const userToUpdate = buser.find(user => user?._id === userid);
      if (!userToUpdate) {
        console.error("User not found");
        setIsFollowing(false); 
        return;
      }

      const response = await axios.get(`http://localhost:7777/binomers`)

      const similarEntry = response.data.find(el => el.author_id === userid && el.user_id === decoded.user._id);

      if (similarEntry) {
        await axios.patch(`http://localhost:8000/users/${userid}`, {
          followers: userToUpdate.followers - 1
        });
        await axios.delete(`http://localhost:7777/binomers/${similarEntry.id}`);
      }

      window.location.reload()
    } catch (error) {
      console.error("Error updating user:", error);
      setIsFollowing(false);
    }
  }

  const getBinomers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/binomers");
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
        navigate("/followers")
      }
    }
  }, [buser, navigate])

  if (isLoading) return <div className='main-loading'><img src="/Loading.svg" alt="" /></div>
  if (error) return <Error/> 

  return (
    <>
        <Nav/>
        <div className="r-wrapper">
            <div className="r-top">
                <h1>Followers</h1>
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
            Following
          </button>
        </div>
        {choiceBinomers === 1 ? (
          <div className="r-card">
          <h1>Followed Channels</h1>
          {binomers.filter(item => item.user_id === decoded?.userId).length > 0 ? (
            binomers
            .filter(item => item.user_id === decoded?.userId)
            .map((el) => {
              return (
                <Link to={`/user/${el.author_id}`} className="r-line" key={el._id}>
                  <img src={`http://localhost:8000/${buser.filter((elements) => elements._id === el.author_id).map((elements) => elements.image)}`} alt="" />
                  <b>{buser.filter((elements) => elements._id === el.author_id).map((elements) => elements.name)}</b>
                  <p>{Math.round(buser.filter((elements) => elements._id === el.author_id).map((elements) => elements.wallet))}$</p>
                </Link>
              );
            })) : (
              <div className="b-empty">
                <img src={emptyImg} alt="Empty" />
              </div>
            )}
        </div>
        ) : (
          <div className="b-card">
            {(() => {
              const filteredBinomers = binomers
                .filter(item => item.author_id === decoded?.userId)
                .filter(el => buser.some(elements => elements._id === el.user_id));
              
              if (filteredBinomers.length === 0) {
                return (
                  <div className="b-empty" style={{width: "90%", margin: "auto"}}>
                    <img src={emptyImg} alt="Empty" />
                  </div>
                );
              }
              
              return filteredBinomers.map((el) => {
                const user = buser.find(elements => elements._id === el.user_id);
                return (
                  <div className="b-line" key={el._id}>
                    <div className="some">
                      <div className="bl-top">
                        <img src={`http://localhost:8000/${user?.image}`} alt="" />
                        <div className="bl-info">
                          <b>{user?.name}</b>
                          <p>Followers: {user?.followers}</p>
                        </div>
                      </div>
                      <p>Balance: {Math.round(user?.wallet)}$</p>
                      <div className="b-buttons">
                        <Link to={`/user/${el.user_id}`} style={{width: '100%'}} className='b-view'>View</Link>
                      </div>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        )}
        </div>
        <Footer/>
    </>
  )
}

export default Followers