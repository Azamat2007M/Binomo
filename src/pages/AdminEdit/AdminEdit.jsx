import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from '../../redux/features/users';
import './adminedit.scss';
import { Switch } from 'antd';

const AdminEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState([]);
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
const getUsers = async () => {
  await axios.get(`https://binomo-backend.onrender.com/users/${id}`)
    .then((res) => {
      setProduct(res.data);
    })
    .catch((err) => {
      alert(err);
    })
}
const UpdateProduct = async (e) => {
    try {
      await axios.patch(`https://binomo-backend.onrender.com/users/${id}`, {
        image: e.target[0].value,
        name: e.target[1].value,
        email: e.target[2].value,
        wallet: e.target[3].value,
        role: e.target[4].value,
      });
      window.location.reload();
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
        navigate(`/admin-edit/${id}`);
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
                    <span className="text">Editor</span>
                </div>
                <div className="activity-data-third">
                <div className={checking ? 'au-card-def au-card' : 'au-card'}>
            <form onSubmit={UpdateProduct}>
          <h1>Editor</h1>
          <input type="text" placeholder="Image" name={user?.image} required />
          <input type="text" placeholder="Name" name={user?.name} required />
          <input type="email" placeholder="Email" name={user?.email} required />
          <input type="wallet" placeholder="Wallet" name={user?.wallet} required />
          <input type="text" placeholder="Role" name={user?.role} required />
          <button type="submit" className="btnlogin">
            Submit
          </button>
          <div className="ae-down">
            <b>Don't want to edit?</b>
            <Link to={'/admin'}>Back</Link>
        </div>
        </form>
            </div>
                </div>
            </div>
        </div>
    </aside>
        </div>
    </>
  )
}

export default AdminEdit