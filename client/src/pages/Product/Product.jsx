import { useEffect, useState, memo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TradingViewPart4 from "../../components/TradingViewPart4/TradingViewPart4";
import Skeleton from "react-loading-skeleton";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import "react-loading-skeleton/dist/skeleton.css";
import "./product.scss";
import { BiCommentDetail } from "react-icons/bi";
import { IoMegaphone } from "react-icons/io5";
import { HiOutlineTrophy } from "react-icons/hi2";
import { FaGift } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { FaChartBar } from "react-icons/fa";
import { RiStockLine } from "react-icons/ri";
import { LuMountain } from "react-icons/lu";
import { BsXLg } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { jwtDecode } from "jwt-decode";
import { Rate } from "antd";
import { useGetByIdQuery } from "../../redux/features/users";
import emptyImg from '../../assets/b-empty.png'
import ProductButton from "../../components/ProductButton/ProductButton";
import Error from "../Error/Error";

const CryptoDetail = () => {
  const { symbol } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isTActive, setIsTActive] = useState(false);
  const [loadingChart, setLoadingChart] = useState(true);
  const [countTrade, setCountTrade] = useState(Number(5));
  const [timer, setTimer] = useState(Number(1));
  const [time, setTime] = useState(new Date());
  const [tg, setTg] = useState("");
  const B_API = "https://api.binance.com/"
  const [counts, setCounts] = useState(3);
  const [cryptoDataAll, setCryptoDataAll] = useState([]);
  const decoded = localStorage.getItem("Access")
    ? jwtDecode(localStorage.getItem("Access"))
    : {};
  const {data: user, isLoading, error} = useGetByIdQuery(decoded?.userId, {
    skip: !decoded?.userId
  });
  const [productInfo, setProductInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [handleId, setHandleId] = useState(0)
  const [infoTrans, setInfoTrans] = useState([]);
  const [activeTimers, setActiveTimers] = useState({});
  let cbalance = Math.round(((Number(user?.wallet) - 10000) * 100) / 10000 );

  const getProductsInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8000/coins");
      setProductInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDisplayedProducts = () => {
    if (!productInfo || !cryptoDataAll) return [];

    if (search.trim() !== "") {
      const filtered = productInfo.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );

      return filtered.map((p) => {
        const coin = cryptoDataAll.find(
          (c) => c.symbol.toLowerCase() === (p.symbol + "usdt").toLowerCase()
        );
        return {
          ...p,
          price: coin ? Number(coin.price).toFixed(2) : "0.00",
        };
      }).slice(0, 5)
    }

    return productInfo.map((p) => {
      const coin = cryptoDataAll.find(
        (c) => c.symbol.toLowerCase() === (p.symbol + "usdt").toLowerCase()
      );
      return {
        ...p,
        price: coin ? Number(coin.price).toFixed(2) : "0.00",
      };
    }).slice(0, 5)
  };

  const postReview = () => {
    const message = `
      <b>Review User_id: ${decoded?.userId}</b>

      <b>Review Text: ${tg}</b>

      <b>Review Rate: ${counts}</b>
    `;
    const url = `https://api.telegram.org/bot5378253930:AAEW0rlP7j7KA50TxsypNSLLKvQ5jYnNPfc/sendMessage?chat_id=-1002119730772&text=${encodeURIComponent(
      message
    )}`;

    axios
      .post(url)
      .then(() => {
        setTg("");
        setCounts(3);
        setHandleId(0);
      })
      .catch((error) => {
        console.error("Error posting review:", error);
      });
  };

  const hGraphChange = (id) => {
    localStorage.setItem("GraphName", id);
    window.location.reload();
  };
  const hIntervalChange = (id) => {
    localStorage.setItem("ChInterval", id);
    window.location.reload();
  }

  const handleGetB = async () => {
    if (cbalance >= 100) {
      const updatedWalletAmount = user.wallet + 5000;
      try {
        await axios.patch(
          `http://localhost:8000/users/${decoded.userId}`,
          {
            wallet: updatedWalletAmount,
          }
        );
      } catch (error) {
        console.error("Error updating user wallet:", error);
      }
    }
  };

  const getTransaction = async () => {
    try {
      const res = await axios.get('http://localhost:1000/transactions');
      setInfoTrans(res.data);

      res.data.forEach((transaction) => {
        if (transaction.status === "open") {
          startTransactionTimer(transaction._id, transaction.endTime);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const startTransactionTimer = (id, endTime) => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = Math.floor((end - now) / 1000);

      if (diff <= 0) {
        clearInterval(interval);
        setActiveTimers((prev) => ({ ...prev, [id]: 0 }));
        setIsTActive(false)
      } else {
        setActiveTimers((prev) => ({ ...prev, [id]: diff }));
        setIsTActive(true)
      }
    }, 1000);
  };

  const updateTradingCount = (type) => {
    if (type === "plus") {
      setCountTrade(countTrade < 5000 ? countTrade + 5 : countTrade);
    } else if (type === "minus") {
      setCountTrade(countTrade > 5 ? countTrade - 5 : countTrade);
    }
  };
  const updateTimer = (type) => {
    if (type === "plus") {
      setTimer(timer > 0 && timer < 5 ? timer + 1 : timer);
    } else if (type === "minus") {
      setTimer(timer > 1 ? timer - 1 : timer);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingChart(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getProductsInfo();
    getTransaction();

    const timeInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          `${B_API}api/v3/ticker/price?symbol=${symbol.toUpperCase()}`
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${B_API}api/v3/ticker/price`
        );
        setCryptoDataAll(response.data);        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
    fetchCryptoData();

    return () => clearInterval(timeInterval);
  }, [symbol, B_API]);

  if (!cryptoData) {
    return (
      <div className="i-box">
        <Skeleton className="skeleton-i1" count={1} />
        <div className="s-side">
          <Skeleton className="skeleton-side" count={1} />
          <Skeleton className="skeleton-charter" count={1} />
          <Skeleton className="skeleton-trade" count={1} />
        </div>
      </div>
    );
  }

  if (isLoading) return <div className='main-loading'><img src="/Loading.svg" alt="" /></div>
  if (error) return <Error/> 

  return (
    <>
      <Nav />
      <div className="w-card">
        <div className="tools-side">
          <div className="cs-wrapper">
            <div className="tools-wrapper">
              <div className="c-sidebar">
                <div className="s-line">
                  <button
                    onClick={() => handleId == 1 ? setHandleId(0) : setHandleId(1)}
                    style={{ color: handleId == 1 ? "white" : "#868893" }}
                    className="line"
                  >
                    <GoGraph className="s-svg"/>
                    <sub>Bars</sub>
                  </button>
                </div>
                <div className="s-line">
                  <Link to={"/transaction"}>
                    <button className="line">
                      <IoMegaphone className="s-svg"/>
                      <sub>Transaction</sub>
                    </button>
                  </Link>
                </div>
                <div className="s-line">
                  <Link to={"/binomers"}>
                    <button className="line">
                      <HiOutlineTrophy className="s-svg"/>
                      <sub>Binomers</sub>
                    </button>
                  </Link>
                </div>
                <div className="s-line">
                  <button className="line" style={{ color: handleId == 2 ? "white" : "#868893" }} onClick={() => handleId == 2 ? setHandleId(0) : setHandleId(2)}>
                    <FaGift className="s-svg"/>
                    <sub>Bonuses</sub>
                  </button>
                </div>
                <div className="s-line">
                  <button className="line" style={{ color: handleId == 3 ? "white" : "#868893" }} onClick={() => handleId == 3 ? setHandleId(0) : setHandleId(3)}>
                    <FaShop className="s-svg"/>
                    <sub>Market</sub>
                  </button>
                </div>
              </div>
              <div className="cd-sidebar">
                <div className="s-line">
                  <button className="line" style={{ color: handleId == 4 ? "white" : "#868893" }} onClick={() => handleId == 4 ? setHandleId(0) : setHandleId(4)}>
                    <BiCommentDetail className="s-svg"/>
                    <sub>Review</sub>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="tools-sidebar">
            <div
              className="csi-wrapper"
              style={{ display: handleId == 2 ? "flex" : "none" }}
            >
              <div className="cs-card">
                <div className="t-line">
                  <h1>Bonuses</h1>
                  <BsXLg
                      style={{ cursor: "pointer", position: "absolute", right: "20"}}
                      onClick={() => setHandleId(0)}
                    />
                </div>
                <div className="cb-line">
                  <div className="bl-line">
                    <div className="bl-left">
                      <h2>Profitable</h2>
                      <b>Bonuse for +10000$</b>
                      <b>Amount: +5000$</b>
                    </div>
                    <div className="bl-right">
                      <p>10000$ / {cbalance * 100}$</p>
                      <span className="bar">
                        <span
                          className="profit"
                          style={{ width: `${cbalance}%` }}
                        ></span>
                      </span>
                    </div>
                  </div>
                  <button
                      onClick={handleGetB}
                      className={cbalance >= 100 ? "bl-active" : "bl-none"}
                    >
                      Get
                    </button>
                </div>
              </div>
            </div>
            <div
              className="csi-wrapper"
              style={{ display: handleId == 3 ? "flex" : "none" }}
            >
              <div className="cm-card">
                <div className="t-line">
                  <h1>Market</h1>
                  <BsXLg
                    style={{ cursor: "pointer", position: "absolute", right: "20"}}
                    onClick={() => setHandleId(0)}
                  />
                </div>
                <input type="text" onChange={(e) => setSearch(e.target.value)} />
                {loading ? (
                  <Skeleton className="coins skeleton" count={6} />
                ) : (
                  <div className="mc-coins">
                    {getDisplayedProducts().length === 0 ? (
                      <div className="b-empty">
                        <img src={emptyImg} alt="Empty" />
                      </div>
                    ) : (
                      getDisplayedProducts().map((el) => (
                        <div
                          className="mc-line"
                          key={el._id}
                          onClick={() => {
                            navigate(`/coin/${el.symbol.toUpperCase()}USDT`)
                          }}
                        >
                          <img src={el.image} alt={el.name} />
                          <h2>{el.name}</h2>
                          <h2 style={{textAlign: 'right'}}>{el.price}$</h2>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
            <div
              className="csi-wrapper"
              style={{ display: handleId == 4 ? "flex" : "none" }}
            >
              <div className="cr-card">
                <div className="t-line">
                  <h1 style={{ margin: "auto" }}>Suggestion <br /> and Review</h1>
                  <BsXLg
                      style={{ cursor: "pointer", position: "absolute", right: "30", top: "30"}}
                      onClick={() => setHandleId(0)}
                    />
                </div>
                <h3>You can write here</h3>
                <textarea
                  value={tg}
                  onChange={(e) => setTg(e.target.value)}
                  rows="3"
                  placeholder="Write your suggestion or review here..."
                />
                <Rate onChange={(value) => setCounts(value)} defaultValue={3} />
                <button style={{cursor: 'pointer'}} onClick={postReview}>Send</button>
              </div>
            </div>
            <div
              className="csi-wrapper"
              style={{ display: handleId == 1 ? "flex" : "none" }}
            >
              <div className="t-line">
                <b>Chart Type</b>
                <BsXLg
                  style={{ cursor: "pointer" }}
                  onClick={() => setHandleId(0)}
                />
              </div>
              <button className={localStorage.getItem("GraphName") == 2 ? "ch-line active-bar" : "ch-line"} onClick={() => hGraphChange('2')}>
                <div className="l-line">
                  <GoGraph />
                  <b>Line</b>
                </div>
              </button>
              <button className={localStorage.getItem("GraphName") == 1 ? "ch-line active-bar" : "ch-line"} onClick={() => hGraphChange('1')}>
                <div className="l-line">
                  <RiStockLine />
                  <b>Candle</b>
                </div>
              </button>
              <button className={localStorage.getItem("GraphName") == 3 ? "ch-line active-bar" : "ch-line"} onClick={() => hGraphChange('3')}>
                <div className="l-line">
                  <LuMountain />
                  <b>Mountain</b>
                </div>
              </button>
              <button className={localStorage.getItem("GraphName") == 0 ? "ch-line active-bar" : "ch-line"} onClick={() => hGraphChange('0')}>
                <div className="l-line">
                  <FaChartBar />
                  <b>Japan Candles</b>  
                </div>
              </button>
              <h2>Interval</h2>
              <div className="ch-interval">
                <button className={localStorage.getItem("ChInterval") == "1" ? "active-bar" : "def-bar"} onClick={() => hIntervalChange("1")}>1M</button>
                <button className={localStorage.getItem("ChInterval") == "5" ? "active-bar" : "def-bar"} onClick={() => hIntervalChange("5")}>5M</button>
                <button className={localStorage.getItem("ChInterval") == "60" ? "active-bar" : "def-bar"} onClick={() => hIntervalChange("60")}>1H</button>
                <button className={localStorage.getItem("ChInterval") == "D" ? "active-bar" : "def-bar"} onClick={() => hIntervalChange("D")}>1D</button>
              </div>
            </div>
          </div>
        </div>
        <div className="c-chart">
          {loadingChart ? (
            <Skeleton className="skeleton-chart" count={1} />
          ) : (
            <TradingViewPart4
              products={symbol.toUpperCase()}
            />
          )}
        </div>
        <div className="c-trade">
          <div className="c-info">
            <div className="ci-flex">
              <div className="ci-line">
                <img
                  src={productInfo
                    .filter(
                      (el) =>
                        el.symbol + "usdt" === cryptoData.symbol.toLowerCase()
                    )
                    .map((el) => el.image)}
                  alt=""
                />
                <div className="ci-text">
                  <h2>
                    {productInfo
                      .filter(
                        (el) =>
                          el.symbol + "usdt" === cryptoData.symbol.toLowerCase()
                      )
                      .map((el) => el.name)}
                  </h2>
                  <h4>Price: {Number(cryptoData.price)}$</h4>
                </div>
              </div>
              <div className="ci-time">
                <b>{time.toLocaleTimeString()}</b>
              </div>
            </div>
          </div>
          <div className="ct-line">
            <div className="ctleft">
              <p>Amount</p>
              <b>Dollar: {countTrade}$</b>
            </div>
            <div className="ct-right">
              <GoPlus style={{ cursor: "pointer" }} onClick={() => updateTradingCount("plus")} />
              <LuMinus
                style={{ cursor: "pointer" }}
                onClick={() => updateTradingCount("minus")}
              />
            </div>
          </div>
          <div className="ct-line">
            <div className="ctleft">
              <p>Time</p>
              <b>Minut: {timer}</b>
            </div>
            <div className="ct-right">
              <GoPlus style={{ cursor: "pointer" }} onClick={() => updateTimer("plus")} />
              <LuMinus style={{ cursor: "pointer" }} onClick={() => updateTimer("minus")} />
            </div>
          </div>
          {infoTrans.map((t) => (
            <div key={t._id} className="transaction-wrapper">
              {t.status === "open" && isTActive && (
                <div className="transaction-card">
                  <b>{t.coin}</b>
                  <b style={{color: t.tradePosition == "Sell" ? 'red' : 'lime'}} className='b-tradep'>{t?.tradePosition}</b>
                  <b>{activeTimers[t._id] || 0}s</b>
                </div>
              )}
            </div>
          ))}
          <div className="ct-trade">
            <ProductButton
              userId={user._id}
              coin={symbol}
              amount={countTrade}
              tradePosition="Buy"
              duration={timer}
              onTradeCreated={() => getTransaction()}
            />
            <ProductButton
              userId={user._id}
              coin={symbol}
              amount={countTrade}
              tradePosition="Sell"
              duration={timer}
              onTradeCreated={() => getTransaction()}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(CryptoDetail);
