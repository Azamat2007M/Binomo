import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import { jwtDecode } from "jwt-decode";
import './profile.scss'
import { useGetByIdQuery } from '../../redux/features/users';

const Profile = () => {
  const navigate = useNavigate()

  const decoded = localStorage.getItem("Access")
  ? jwtDecode(localStorage.getItem("Access"))
  : {};
  const {data: user, isLoading, error} = useGetByIdQuery(decoded?.userId, {
    skip: !decoded?.userId
  });

  useEffect(() => {
    if (user?.useractived == true) {
      navigate('/profile')
    }else if(user?.useractived == false){
      navigate('/ban')
    }else if(!localStorage.getItem("Access")){
      navigate('/')
    }
  }, []);

  if (isLoading) return <div className='main-loading'><img src="/Loading.svg" alt="" /></div>
  if (error) return <p>Error</p>

  return (
    <>
      <Nav />
      {localStorage.getItem('Access') != null ? (
            <div className="all">
            <div className="profile1">
              {user?.level === 1 ? (
                  <div className="p-image">
                    <div className="p-image1">
                      <img src={`http://localhost:8000/${user?.image}`} alt="" />
                    </div>
                  </div>
                ) : user?.level === 2 ? (
                  <div className="p-image">
                    <div className="p-image2">
                      <img src={`http://localhost:8000/${user?.image}`} alt="" />
                    </div>
                  </div>
                ) : user?.level === 3 ? (
                  <div className="p-image">
                    <div className="p-image3">
                      <img src={`http://localhost:8000/${user?.image}`} alt="" />
                    </div>
                  </div>
                ) : user?.level === 4 ? (
                  <div className="p-image">
                    <div className="p-image4">
                      <img src={`http://localhost:8000/${user?.image}`} alt="" />
                    </div>
                  </div>
                ) : user?.level >= 5 ? (
                  <div className="p-image">
                    <div className="p-image5">
                      <img src={`http://localhost:8000/${user?.image}`} alt="" />
                    </div>
                  </div>
                ) : null}
              
              <div className="pl-top">
              <div className="pt-line">
                <h1>Name:</h1>
                <h2 className='p-act'>{user?.name}</h2>
              </div>
              <div className="pt-line">
                <h1>Balance:</h1>
                <h2 className='p-act'>{Number(user?.wallet).toFixed(2)}$</h2>
              </div>
              </div>
              <div className="p-line">
                <h2>Email:</h2>
                <h2 className='p-act'>{user?.email}</h2>
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
                <h2 className='p-act'>{user?.followers}</h2>
              </div>
                  <button
                    className="editbtn"
                    onClick={() => navigate('/followers')}
                  >
                    <b>Followers</b>
                  </button>
              </div>
              <Link to={`/update/${decoded?.userId}`}>
                <div className="close">
                  <button
                    className="editbtn"
                  >
                    Edit
                  </button>
                </div>
              </Link>
              <div className="btn-wrapper">
                <div className="close">
                <button
                  className="closebtn"
                  onClick={() => {
                      localStorage.removeItem("Access");
                      navigate("/")
                      window.location.reload()
                    }}    
                >
                  Log out
                </button>
              </div>
              </div>
            </div>
          </div>
      ) : null}
      <Footer />
    </>
  );
};

export default Profile;
