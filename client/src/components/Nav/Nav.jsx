import { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoEnterOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import "./nav.scss";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Toaster } from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useGetByIdQuery } from "../../redux/features/users";
import Error from "../../pages/Error/Error";

const Nav = () => {
  const [pass, setPass] = useState(false);
  const [pass2, setPass2] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const decoded = localStorage.getItem("Access") ? jwtDecode(localStorage.getItem("Access")) : {};  
  const {data: user, isLoading, error} = useGetByIdQuery(decoded?.userId, {
    skip: !decoded?.userId
  });

  const dropDownToggle = () => {
    if (!pass) {
      setPass(true);
    } else {
      setPass(false);
    }
  };
  const dropDownToggle2 = () => {
    if (!pass2) {
      setPass2(true);
    } else {
      setPass2(false);
    }
  };
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    if (user !== null) {
      if (user?.useractived === false) {
        navigate("/ban");
      } 
    }  
  }, [user, navigate]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <Error/> 

  return (
    <>
      <nav>
        <Toaster
          toastOptions={{
            className: "r-toast",
          }}
        />
        <div className="case">
          <div className="navbar">
            <div className="n-left">
              {!isOpen ? (
                <HiMenuAlt1 onClick={toggleDrawer} className="burger" />
              ) : (
                <IoClose className="exit" onClick={() => setIsOpen(false)} />
              )}
              <Drawer
                open={isOpen}
                direction="left"
                className="n-menu"
                onClose={toggleDrawer}
                overlayColor="no"
                size={'30%'}
              >
                <div className="n-line">
                  <h1>VIP</h1>
                </div>
                <div className="n-line">
                  <div className="active-top" onClick={dropDownToggle}>
                    <h1>For traders</h1>
                    {!pass ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </div>
                  <div className={pass ? "active" : "default"}>
                    <h1>Tournaments</h1>
                    <h1>Promotions</h1>
                    <h1>Strategies</h1>
                  </div>
                </div>
                <div className="n-line">
                  <div className="active-top" onClick={dropDownToggle2}>
                    <h1>Information</h1>
                    {!pass2 ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </div>
                  <div className={pass2 ? "active" : "default"}>
                    <h1>Statuses</h1>
                    <h1>About US</h1>
                    <h1>Regulations</h1>
                    <h1>Client Agreement</h1>
                    <h1>AML policy</h1>
                  </div>
                </div>
                <div className="n-line">
                  <h1>Help Center</h1>
                </div>
                <div className="n-line">
                  <Link to={"/binomers"}><h1>Binomers</h1></Link>
                </div>
                <a href="https://t.me/binomoplatform">
                  <button className="b-telegram">
                    Binomo on Telegram <FaTelegramPlane className="n-icon" />
                  </button>
                </a>
                <a href="https://www.instagram.com/binomo/">
                  <button className="b-instagram">
                    Binomo on Instagram <FaInstagram className="n-icon" />
                  </button>
                </a>
              </Drawer>
              <Link to={"/"} className="b-logo">
                  <img src="https://play-lh.googleusercontent.com/_XUdhIjKwhAv1F7n2SBDvSHcEfT3Rh4wpHquYYMi_uuJu-tn7B4yV7uuh0tdBrP3dC5Y" alt=""/>
                  <h1 className="bi-logo">binomo</h1>
              </Link>
            </div>
            <div className="n-right">
              {localStorage.getItem("Access") == null ? (
                <Link to="/login">
                  <div className="logs">
                    <button>
                      <IoEnterOutline className="enter" />
                      <h1> Sign up</h1>
                    </button>
                  </div>
                </Link>
              ) : (
                <div className="twice">
                  <Link to={"/profile"}>
                    {user?.image === undefined ? (
                      <RxAvatar className="a-twice"/>
                    ) : (
                      <>
                        {user?.level === 1 ? (
                            <div className="p-image1 p-image">
                              <img src={`http://localhost:8000/${user?.image}`} alt="" />
                            </div>
                          ) : user?.level === 2 ? (
                            <div className="p-image2 p-image">
                              <img src={`http://localhost:8000/${user?.image}`} alt="" />
                            </div>
                          ) : user?.level === 3 ? (
                            <div className="p-image3 p-image">
                              <img src={`http://localhost:8000/${user?.image}`} alt="" />
                            </div>
                          ) : user?.level === 4 ? (
                            <div className="p-image4 p-image">
                              <img src={`http://localhost:8000/${user?.image}`} alt="" />
                            </div>
                          ) : user?.level >= 5 ? (
                            <div className="p-image5 p-image">
                              <img src={`http://localhost:8000/${user?.image}`} alt="" />
                            </div>
                          ) : null}
                      </>
                    )}
                  </Link>
                  <div className="w-line">
                    <b>{Math.round(user?.wallet) || 0} $</b>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
