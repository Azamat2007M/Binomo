import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../redux/features/users';
import './adminusers.scss';
import { Switch } from 'antd';

const AdminUsers = () => {
  const navigate = useNavigate();

  const decoded = localStorage.getItem("Access")
    ? jwtDecode(localStorage.getItem("Access"))
    : {};
    const { data: buser, isLoading } = useGetUserQuery();
  const [user, setUser] = useState(null);
  const bodyRef = useRef(null);
  const sidebarRef = useRef(null);
  const [search, setSearch] = useState('');
  const [checking, setChecking] = useState(false);
  const gameSearch = buser?.filter((el) => {
    return el.name.toLowerCase().includes(search.toLowerCase());
  });
  const [infoTrans, setInfoTrans] = useState([])
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

const UpdateProduct = async (user_id) => {
    try {
      await axios.patch(`https://binomo-backend.onrender.com/users/${user_id}`, {
        useractived: false,
      })
      .then(() => window.location.reload())
    } catch (err) {
      alert(err);
    }
  }
  const DeleteUser = async (user_id) => {
    try {
      await axios.delete(`https://binomo-backend.onrender.com/users/${user_id}`);
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  }
  useEffect(() => {
    getUser();
    getTransaction()
  }, []);

  useEffect(() => {
    if (user !== null) {
      if (user?.role === 'admin') {
        navigate("/admin-users");
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
                    <i className="uil uil-estate"></i>
                    <span className="link-name">Dahsboard</span>
                </Link></li>
                <li><Link to={'/admin-transaction'}>
                    <i className="uil uil-chart"></i>
                    <span className="link-name">Transactions</span>
                </Link></li>
                <li><Link to={'/admin-users'}>
                    <i className="uil uil-thumbs-up l-active"></i>
                    <span className="link-name l-active">Users</span>
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
                  <Switch onChange={onChange} /> 
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
            <div className="activity">
                <div className="title">
                    <i className="uil uil-clock-three"></i>
                    <span className="text">Users Control</span>
                </div>
                <div className="activity-data-second">
                    {gameSearch?.filter((el) => el?.role === 'user').map((el) => {
                        return(
                            <div className="ad-line">
                                <div className="al-line">
                                    <span>{el?.name}</span>
                                </div>
                                <div className="al-line">
                                    <span>{el?.email}</span>
                                </div>
                                <div className="al-line">
                                    <span>{Number(el?.wallet).toFixed(2)}</span>
                                </div>
                                <div className="al-line">
                                    <span>{el?.useractived ? 'Active' : 'Baned'}</span>
                                </div>
                                <div className="al-btn">
                                <button className='b-ban' onClick={() => UpdateProduct(el?._id)}>Ban</button>
                                <Link to={`/admin-edit/${el?._id}`}>
                                  <button className='b-edit'>Edit</button>
                                </Link>
                                <button className='b-delete' onClick={() => DeleteUser(el?._id)}>Delete</button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    </aside>
        </div>
    </>
  )
}

export default AdminUsers