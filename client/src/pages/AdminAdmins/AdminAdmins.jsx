import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import {
  useGetByIdQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation
} from '../../redux/features/users';
import './adminadmins.scss';
import { Switch } from 'antd';
import Error from '../Error/Error';
import { PiEmptyBold } from "react-icons/pi";

const AdminAdmins = () => {
  const navigate = useNavigate();
  const decoded = localStorage.getItem("Access")
    ? jwtDecode(localStorage.getItem("Access"))
    : {};
  const {data: user} = useGetByIdQuery(decoded?.userId, {
    skip: !decoded?.userId
  });
  const { data: buser, isLoading, error } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const bodyRef = useRef(null);
  const sidebarRef = useRef(null);
  const [search, setSearch] = useState('');
  const [checking, setChecking] = useState(false);
  const [somed, setsomed] = useState(false);
  const adminSearch = buser?.filter((el) => {
    return el.name.toLowerCase().includes(search.toLowerCase());
  });
  const onChange = (checked) => {
    if (!checked) {
      setChecking(false)
    } else {
      setChecking(true)
    }
  };

  const UpdateProduct = async (user_id) => {
    try {
      await updateUser({ id: user_id, useractived: false }).unwrap();
    } catch (err) {
      alert(err);
    }
  }
  const DeleteUser = async (user_id) => {
    try {
      await deleteUser({ id: user_id }).unwrap();
    } catch (err) {
      alert(err);
    }
  }

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

  useEffect(() => {
    if (user !== null) {
      if (user?.role === 'admin') {
        navigate("/admin-admins");
      } else if (localStorage.getItem("Access")) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }
  }, [user]);

  if (isLoading) return <div className='main-loading'><img src="/Loading.svg" alt="" /></div>
  if (error) return <Error/> 

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
                    <i className="uil uil-comments l-active"></i>
                    <span className="link-name l-active">Admins</span>
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
                <i className={somed ? 'somed' : 'uil uil-search'} onClick={() => setsomed(true)}></i>
                <input type="text" onChange={(e) => setSearch(e.target.value)} placeholder="Search here..."/>
            </div>
            <img src={`http://localhost:8000/${user?.image}`} alt="" style={{cursor: 'pointer'}} onClick={() => navigate('/profile')}/>
        </div>
        <div className="dash-content">
            <div className="activity">
                <div className="title">
                    <i className="uil uil-clock-three"></i>
                    <span className="text">Admins Control</span>
                </div>
                <div className="activity-data-second act-user-scroll">
                    {adminSearch?.filter((el) => el?.role === 'admin' && el?._id !== decoded?.userId).length === 0 ? (
                        <div className="no-data">
                            <PiEmptyBold />
                            <p>No admins found</p>
                        </div>
                    ) : (
                        adminSearch?.filter((el) => el?.role === 'admin' && el?._id !== decoded?.userId).map((el) => {
                            return(
                                <div className="ad-line" key={el?._id}>
                                    <div className="al-line">
                                        <span>{el?.name}</span>
                                    </div>
                                <div className="al-line">
                                    <span>{el?.email}</span>
                                </div>
                                <div className="al-line">
                                    <span style={{margin: "auto"}}>{Number(el?.wallet).toFixed(2)}</span>
                                </div>
                                <div className="al-line">
                                    <span style={{margin: "auto"}}>{el?.useractived ? 'Active' : 'Baned'}</span>
                                </div>
                                <div className="al-btn">
                                  <button className='b-ban' onClick={() => UpdateProduct(el?._id)}>Ban</button>
                                  <button className='b-edit' onClick={() => navigate(`/admin-edit/${el?._id}`)}>Edit</button>
                                  <button className='b-delete' onClick={() => DeleteUser(el?._id)}>Delete</button>
                                </div>
                            </div>
                        )
                    }))}
                </div>
            </div>
        </div>
    </aside>
        </div>
    </>
  )
}

export default AdminAdmins