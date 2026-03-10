import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import {
  useGetByIdQuery
} from '../../redux/features/users';
import './adminedit.scss';
import { Switch } from 'antd';
import Error from '../Error/Error';

const AdminEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const decoded = localStorage.getItem("Access")
    ? jwtDecode(localStorage.getItem("Access"))
    : {};
  const bodyRef = useRef(null);
  const sidebarRef = useRef(null);
  const [checking, setChecking] = useState(false);
  const { data: buser, isLoading, error } = useGetByIdQuery(id);
  const {data: user} = useGetByIdQuery(decoded?.userId, {
    skip: !decoded?.userId
  });
  const onChange = (checked) => {
    if (!checked) {
      setChecking(false)
    } else {
      setChecking(true)
    }
  };
  const [form, setForm] = useState({
    image: '',
    name: '',
    email: '',
    wallet: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    try {
      await axios.patch(`http://localhost:8000/users/${id}`, {
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

  const handleModeToggle = () => {
    if (checking) {
      setChecking(false)
      localStorage.setItem("mode", "light");
    } else {
      setChecking(true)
      localStorage.setItem("mode", "dark");
    }
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
    if (buser) {
      setForm({
        image: buser?.image || '',
        name: buser?.name || '',
        email: buser?.email || '',
        wallet: buser?.wallet || '',
        role: buser?.role || '',
      });
    }
  }, [buser]);

  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    if (savedMode === "dark") {
        setChecking(true)
    } else {
        setChecking(false)
    }
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

  if (isLoading) return <div className='main-loading'><img src="/Loading.svg" alt="" /></div>
  if (error) return <Error/> 

  return (
    <>
        <div className="all-wrapper" ref={bodyRef}>
        <aside ref={sidebarRef} className={checking ? 'aside-def' : ''}>
        <div className="logo-name">
            <div className="logo-image">
               <img src="/Logo3.png" alt=""/>
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
                  <Switch checked={checking} onChange={() => setChecking(prev => !prev)} /> 
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
                    <span className="text">Editor</span>
                </div>
                <div className="activity-data-third">
                <div className={checking ? 'au-card-def au-card' : 'au-card'}>
            <form onSubmit={handleUpdate}>
          <h1>Editor</h1>
          <input
            type="text"
            placeholder="Image"
            name="image"
            value={form.image}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Wallet"
            name="wallet"
            value={form.wallet}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          />
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