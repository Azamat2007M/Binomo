import React, { useEffect, useState, useRef } from 'react';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../redux/features/users';
import './admin.scss';
import { Switch } from 'antd';

const Admin = () => {
  const navigate = useNavigate();

  const decoded = localStorage.getItem("Access")
    ? jwtDecode(localStorage.getItem("Access"))
    : {};
    const { data: buser, isLoading } = useGetUserQuery();
  const [user, setUser] = useState(null);
  const bodyRef = useRef(null);
  const sidebarRef = useRef(null);
  const [search, setSearch] = useState('');
  const [pcheck, setPcheck] = useState(0);
  const gameSearch = buser?.filter((el) => {
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
        .get('http://localhost:7777/transaction')
        .then((res) => {
            setInfoTrans(res.data);
        })
        .catch((err) => {
            alert(err);
        })
}
  useEffect(() => {
    getUser();
    getTransaction()
  }, []);

  useEffect(() => {
    if (user !== null) {
      if (user?.role === 'admin') {
        navigate("/admin");
      } else if (localStorage.getItem("Access")) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }
  }, [user]);

  const getUser = async () => {
    try {
      const res = await axios.get(`https://binomo-backend.onrender.com/users/${decoded.user._id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getMode = localStorage.getItem("mode");
    if (getMode && getMode === "dark") {
      bodyRef.current.classList.toggle("dark");
    }

    const getStatus = localStorage.getItem("status");
    if (getStatus && getStatus === "close") {
      sidebarRef.current.classList.toggle("close");
    }
  }, []);

  const handleModeToggle = () => {
    bodyRef.current.classList.toggle("dark");
    if (bodyRef.current.classList.contains("dark")) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
    document.body.style.background = 'dark'
  };

  const handleSidebarToggle = () => {
    sidebarRef.current.classList.toggle("close");
    if (sidebarRef.current.classList.contains("close")) {
      localStorage.setItem("status", "close");
    } else {
      localStorage.setItem("status", "open");
    }
  };
  return (
    <>
        <div className="all-wrapper" ref={bodyRef}>
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
                <div className="mode-toggle" onClick={handleModeToggle}>
                  <Switch onChange={onChange} onClick={handleModeToggle}/> 
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
            <img src={user?.image} alt="" style={{cursor: 'pointer'}} onClick={() => navigate('/profile')}/>
        </div>
        <div className="dash-content">
            <div className="overview">
                <div className="title">
                    <i className="uil uil-tachometer-fast-alt"></i>
                    <span className="text">Dashboard</span>
                </div>
                <div className="boxes">
                    <div className="box box1">
                        <i className="uil uil-thumbs-up"></i>
                        <span className="text">Total Users</span>
                        <span className="number">{buser?.length}</span>
                    </div>
                    <div className="box box2">
                        <i className="uil uil-comments"></i>
                        <span className="text">Products</span>
                        <span className="number">99</span>
                    </div>
                    <div className="box box3">
                        <i className="uil uil-share"></i>
                        <span className="text">Transactions</span>
                        <span className="number">{infoTrans?.length}</span>
                    </div>
                </div>
            </div>
            <div className="activity">
                <div className="title">
                    <i className="uil uil-clock-three"></i>
                    <span className="text">Users Activity</span>
                </div>
                <div className="activity-data">
                    <div className="data names">
                        <span className="data-title">Name</span>
                        <div className="data-info">
                          {gameSearch?.map((el) => {
                          return(
                            <span key={el?._id}>{el?.name}</span>
                          )
                        })}
                        </div>
                    </div>
                    <div className="data email">
                        <span className="data-title">Email</span>
                        <div className="data-info">
                        {gameSearch?.map((el) => {
                          return(
                            <span key={el?._id}>{el?.email}</span>
                          )
                        })}
                        </div>
                    </div>
                    <div className="data joined">
                        <span className="data-title">Balance</span>
                        <div className="data-info">
                        {gameSearch?.map((el) => {
                          return(
                            <span key={el?._id}>{Number(el?.wallet).toFixed(2)}</span>
                          )
                        })}
                        </div>
                    </div>
                    <div className="data type">
                        <span className="data-title">Level</span>
                        <div className="data-info">
                        {gameSearch?.map((el) => {
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
                        {gameSearch?.map((el) => {
                          return(
                            <span key={el?._id}>{el?.useractived ? 'Active' : 'False'}</span>
                          )
                        })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
        </div>
    </>
  )
}

export default Admin