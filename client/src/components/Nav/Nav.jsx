import { useState, useEffect } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoEnterOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./nav.scss";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { Toaster } from "react-hot-toast";
import { RxAvatar } from "react-icons/rx";
import { jwtDecode } from "jwt-decode";
import { useGetByIdQuery } from "../../redux/features/users";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Error from "../../pages/Error/Error";
import axios from "axios";

const Nav = () => {
  const [sections, setSections] = useState({
    forTraders: false,
    information: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [previousTrades, setPreviousTrades] = useState([]);
  const navigate = useNavigate();
  const decoded = localStorage.getItem("Access")
    ? jwtDecode(localStorage.getItem("Access"))
    : {};
  const { data: user, isLoading, error } = useGetByIdQuery(decoded?.userId, {
    skip: !decoded?.userId,
    pollingInterval: 5000,
  });

  const toggleSection = (name) => {
    setSections((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const closeDrawer = () => setIsOpen(false);

  useEffect(() => {
    if (user !== null && user?.useractived === false) {
      navigate("/ban");
    }

    const monitorTrades = async () => {
      try {
        const res = await axios.get('http://localhost:1000/transactions');
        const currentTrades = res.data;

        previousTrades.forEach((trade) => {
          const currentTrade = currentTrades.find(t => t._id === trade._id);
          if (trade.status === "open" && currentTrade && currentTrade.status === "closed") {
            toast.success(`Trade - ${trade?.coin} is closed`, {
              autoClose: 2000,
              style: {
                background: "#1e7e34",
                color: "white",
              },
            });
          }
        });

        setPreviousTrades(currentTrades);
      } catch (err) {
        console.error(err);
      }
    };

    const tradeInterval = setInterval(monitorTrades, 2000);
    return () => clearInterval(tradeInterval);
  }, [user, navigate, previousTrades]);

  if (isLoading) return <div className='main-loading'><img src="/Loading.svg" alt="" /></div>
  if (error) return <Error/> 

  return (
    <>
      <ToastContainer position="top-right" />
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
                <IoClose className="exit" onClick={closeDrawer} />
              )}
              <Drawer
                open={isOpen}
                direction="left"
                className="n-menu"
                onClose={closeDrawer}
                enableOverlay={false}
                size="30%"
              >
                <div className="n-line">
                  <h1><Link to="/">Home</Link></h1>
                </div>
                <div className="n-line">
                  <div
                    className="active-top"
                    onClick={() => toggleSection("forTraders")}
                  >
                    <h1>For traders</h1>
                    {!sections.forTraders ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </div>
                  <div className={sections.forTraders ? "active" : "default"}>
                    <h1>Tournaments</h1>
                    <h1>Promotions</h1>
                    <h1>Strategies</h1>
                  </div>
                </div>
                <div className="n-line">
                  <div
                    className="active-top"
                    onClick={() => toggleSection("information")}
                  >
                    <h1>Information</h1>
                    {!sections.information ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </div>
                  <div className={sections.information ? "active" : "default"}>
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
                  <Link to={"/binomers"}>
                    <h1>Binomers</h1>
                  </Link>
                </div>
                <a href="https://t.me/binomoplatform">
                  <button className="b-telegram">
                    <p>Binomo on Telegram</p> <FaTelegramPlane className="n-icon" />
                  </button>
                </a>
                <a href="https://www.instagram.com/binomo/">
                  <button className="b-instagram">
                    <p>Binomo on Instagram</p> <FaInstagram className="n-icon" />
                  </button>
                </a>
              </Drawer>
              <Link to={"/"} className="b-logo">
                  <img src="/Logo3.png" alt=""/>
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
