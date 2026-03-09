import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  useGetByIdQuery,
  useGetUserQuery,
} from '../../redux/features/users';
import './admin.scss';
import { Switch } from 'antd';
import { FaRegUser } from "react-icons/fa";
import { LiaCoinsSolid } from "react-icons/lia";
import { AiOutlineStock } from "react-icons/ai";
import Error from '../Error/Error';
import { PiEmptyBold } from 'react-icons/pi';

const Admin = () => {
  const navigate = useNavigate();

  const decoded = localStorage.getItem("Access")
    ? jwtDecode(localStorage.getItem("Access"))
    : {};
  const {data: user} = useGetByIdQuery(decoded?.userId, {
    skip: !decoded?.userId
  });
  const { data: buser, isLoading, error } = useGetUserQuery();
  const sidebarRef = useRef(null);
  const [search, setSearch] = useState('');
  const filteredUsers = buser?.filter((el) => {
    return el.name.toLowerCase().includes(search.toLowerCase());
  });
  const [infoTrans, setInfoTrans] = useState([])
  const [checking, setChecking] = useState(false);
  const onChange = (checked) => {
    if (!checked) {
      setChecking(false)
    } else {
      setChecking(true)
    }
  };

  const getTransaction = async () => {
    await axios
        .get('http://localhost:1000/transactions')
        .then((res) => {
            setInfoTrans(res.data);
        })
        .catch((err) => {
            alert(err);
        })
  }

  const handleSidebarToggle = () => {
    if (sidebarRef.current) {
      sidebarRef.current.classList.toggle("close");
      if (sidebarRef.current.classList.contains("close")) {
        localStorage.setItem("status", "close");
      } else {
        localStorage.setItem("status", "open");
      }
    }
  };

  useEffect(() => {
    getTransaction()
  }, []);

  useEffect(() => {
    if (!user) {
      if (user?.role === 'admin') {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [user, navigate]);

  if (isLoading) return <div className='main-loading'><img src="/Loading.svg" alt="" /></div>
  if (error) return <Error/> 

  return (
    <>
        <div className="all-wrapper">
        <aside ref={sidebarRef} className={checking ? 'aside-def' : ''}>
        <div className="logo-name">
            <div className="logo-image">
               <img src="https://play-lh.googleusercontent.com/_XUdhIjKwhAv1F7n2SBDvSHcEfT3Rh4wpHquYYMi_uuJu-tn7B4yV7uuh0tdBrP3dC5Y" alt=""/>
            </div>
            <Link to={'/'} className="logo_name"  style={{color: !checking ? 'black' : 'white'}}>Binomo</Link>
        </div>
        <div className="menu-items">
            <ul className="nav-links">
                <li><Link to={'/admin'}>
                    <i className="uil uil-estate l-active"></i>
                    <span className="link-name l-active">Dahsboard</span>
                </Link></li>
                <li><Link to={'/admin-transaction'}>
                    <i className="uil uil-chart"></i>
                    <span className="link-name">Transactions</span>
                </Link></li>
                <li><Link to={'/admin-users'}>
                    <i className="uil uil-thumbs-up"></i>
                    <span className="link-name">Users</span>
                </Link></li>
                <li><Link to={'/admin-admins'}>
                    <i className="uil uil-comments"></i>
                    <span className="link-name">Admins</span>
                </Link></li>
            </ul>
            
            <ul className="logout-mode">
                <li><a href="#">
                    <i className="uil uil-signout"></i>
                    <span className="link-name" onClick={() => {
                        localStorage.removeItem("Access");
                        navigate("/admin-login");
                      }} >Logout</span>
                </a></li>
                <li className="mode">
                    <a href="#">
                        <i className="uil uil-moon"></i>
                    <span className="link-name">Dark Mode</span>
                </a>
                <div className="mode-toggle">
                  <Switch onChange={onChange}/> 
                </div>
            </li>
            </ul>
        </div>
    </aside>
    <aside className={checking ? 'aside-def dashboard' : 'dashboard'}>
        <div className={checking ? 'aside-def top' : 'top'}>
            <i className="uil uil-bars sidebar-toggle" style={{color: !checking ? 'black' : 'white'}} onClick={handleSidebarToggle}></i>
            <div className="search-box">
                <i className="uil uil-search"></i>
                <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search here..."/>
            </div>
            <img src={`http://localhost:8000/${user?.image}`} alt="" style={{cursor: 'pointer'}} onClick={() => navigate('/profile')}/>
        </div>
        <div className="dash-content">
            <div className="overview">
                <div className="title">
                    <i className="uil uil-tachometer-fast-alt"></i>
                    <span className="text">Dashboard</span>
                </div>
                <div className="boxes">
                    <div className="box box1">
                        <i className="uil"><FaRegUser /></i>
                        <span className="text">Total Users</span>
                        <span className="number">{buser?.length}</span>
                    </div>
                    <div className="box box2">
                        <i className="uil"><LiaCoinsSolid /></i>
                        <span className="text">Products</span>
                        <span className="number">99</span>
                    </div>
                    <div className="box box3">
                        <i className="uil"><AiOutlineStock /></i>
                        <span className="text">Transactions</span>
                        <span className="number">{infoTrans?.length}</span>
                    </div>
                </div>
            </div>
            <div className="activity">
                <div className="title">
                    <i className="uil uil-clock-three"></i>
                    <span className="text">Users</span>
                </div>
                <div className="activity-data">
                    <div className="data names">
                        <span className="data-title">Name</span>
                        <div className="data-info">
                          {filteredUsers?.map((el) => {
                          return(
                            <span key={el?._id}>{el?.name}</span>
                          )
                        })}
                        </div>
                    </div>
                    <div className="data email">
                        <span className="data-title">Email</span>
                        <div className="data-info">
                        {filteredUsers?.map((el) => {
                          return(
                            <span key={el?._id}>{el?.email}</span>
                          )
                        })}
                        </div>
                    </div>
                    <div className="data joined">
                        <span className="data-title">Balance</span>
                        <div className="data-info">
                        {filteredUsers?.map((el) => {
                          return(
                            <span key={el?._id}>{Number(el?.wallet).toFixed(2)}</span>
                          )
                        })}
                        </div>
                    </div>
                    <div className="data type">
                        <span className="data-title">Level</span>
                        <div className="data-info">
                        {filteredUsers?.map((el) => {
                          return(
                            <div className="dt-line" key={el?._id}>
                              {el?.level === 1 ? (
                                <span className='p-act'>Bronze</span>
                              ) : el?.level === 2 ? (
                                <span className='p-act'>Silver</span>
                              ) : el?.level === 3 ? (
                                <span className='p-act'>Platina</span>
                              ) : el?.level === 4 ? (
                                <span className='p-act'>Legendary</span>
                              ) : el?.level >= 5 ? (
                                <span className='p-act'>KokSultan</span>
                              ) : null}
                            </div>
                          )
                        })}
                        </div>
                    </div>
                    <div className="data status">
                        <span className="data-title">Status</span>
                        <div className="data-info">
                        {filteredUsers?.map((el) => {
                          return(
                            <span key={el?._id}>{el?.useractived ? 'Active' : 'False'}</span>
                          )
                        })}
                        </div>
                    </div>
                </div>
                {filteredUsers?.length === 0 && (
                  <div className="no-data" style={{marginTop: "20px"}}>
                    <PiEmptyBold />
                    <p>No users found</p>
                  </div>
                )}
            </div>
        </div>
    </aside>
        </div>
    </>
  )
}

export default Admin