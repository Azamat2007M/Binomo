import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  useGetByIdQuery,
  useGetUserQuery,
} from '../../redux/features/users';
import './admintransaction.scss';
import { Switch } from 'antd';
import { PiEmptyBold } from "react-icons/pi";
import Error from '../Error/Error';

const AdminAdmins = () => {
  const navigate = useNavigate();
  const decoded = localStorage.getItem("Access")
    ? jwtDecode(localStorage.getItem("Access"))
    : {};
  const { data: buser, isLoading, error } = useGetUserQuery();
  const {data: user} = useGetByIdQuery(decoded?.userId, {
      skip: !decoded?.userId
  });
  const bodyRef = useRef(null);
  const sidebarRef = useRef(null);
  const [search, setSearch] = useState('');
  const [checking, setChecking] = useState(false);
  const [infoTrans, setInfoTrans] = useState([])

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

  useEffect(() => {
    getTransaction()
  }, []);

  useEffect(() => {
    if (user !== null) {
      if (user?.role === 'admin') {
        navigate("/admin-transaction");
      } else if (localStorage.getItem("Access")) {
        navigate(-1);
      } else {
        navigate("/");
      }
    }
  }, [user]);

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
  const filteredTransactions = infoTrans?.filter((el) => {
    return el.coin.toLowerCase().includes(search.toLowerCase());
  });

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
                    <i className="uil uil-chart l-active"></i>
                    <span className="link-name l-active">Transactions</span>
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
                  <Switch onChange={() => setChecking(prev => !prev)} /> 
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
            <div className="activity">
                <div className="title">
                    <i className="uil uil-clock-three"></i>
                    <span className="text">Transactions</span>
                </div>
                <div className="activity-data-second act-tr-scroll">
                    {filteredTransactions.length > 0 ? filteredTransactions?.map((el) => {
                        return(
                            <div className="adt-line" key={el?.userId}>
                                <div className="al-line">
                                    <span>{buser?.find((item) => el?.userId === item?._id)?.name}</span>
                                </div>
                                <div className="al-line">
                                    <span>{el?.coin}</span>
                                </div>
                                <div className="al-line">
                                    <span>{new Date(el?.startTime).getHours()}:{new Date(el?.startTime).getMinutes() < 10 ? "0"+new Date(el?.startTime).getMinutes() : new Date(el?.startTime).getMinutes()}</span>
                                </div>
                                <div className="al-line">
                                    <span>{el?.amount}$</span>
                                </div>
                                <div className="al-line">
                                    <span>{Number(el?.startPrice).toFixed(2)}</span>
                                </div>
                                <div className="al-line">
                                {el?.tradePosition == 'Sell' ? (
                                      <span style={{color: 'red'}}>{el?.tradePosition}</span>
                                    ) : (
                                      <span style={{color: 'lime'}}>{el?.tradePosition}</span>
                                    )}
                                </div>
                                <div className="al-line">
                                    <span>{Number(el?.endPrice).toFixed(2)}</span>
                                </div>
                                <div className="al-line">
                                    {el?.profit[0] == '-' ? (
                                      <span style={{color: 'red'}}>{Number(el?.profit).toFixed(2)}$</span>
                                    ) : (
                                      <span style={{color: 'lime'}}>+{Number(el?.profit).toFixed(2)}$</span>
                                    )}
                                </div>
                            </div>
                        )
                    }) : (
                        <div className="no-data">
                            <PiEmptyBold />
                            <p>No transactions found</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </aside>
        </div>
    </>
  )
}

export default AdminAdmins