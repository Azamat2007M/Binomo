import React, { useEffect, useState, useRef, memo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TradingViewPart4 from "../../components/TradingViewPart4/TradingViewPart4";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Nav from "../../components/Nav/Nav";
import Footer from "../../components/Footer/Footer";
import "react-loading-skeleton/dist/skeleton.css";
import "./product.scss";
import { IoHome } from "react-icons/io5";
import { BiCommentDetail } from "react-icons/bi";
import { IoMegaphone } from "react-icons/io5";
import { HiOutlineTrophy } from "react-icons/hi2";
import { FaGift } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { GoGraph } from "react-icons/go";
import { LuCandlestickChart } from "react-icons/lu";
import { FaChartBar } from "react-icons/fa";
import { LuMountain } from "react-icons/lu";
import { BsXLg } from "react-icons/bs";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import { jwtDecode } from "jwt-decode";
import { Rate } from "antd";

const CryptoDetail = () => {
  const { symbol } = useParams();
  const [cryptoData, setCryptoData] = useState(null);
  const container = useRef();
  const navigate = useNavigate();
  const [Product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [chartGraph, setChartGraph] = useState(false);
  const [graphName, setGraphName] = useState("1");
  const [countTrade, setCountTrade] = useState(Number(5));
  const [timer, setTimer] = useState(Number(1));
  const [time, setTime] = useState(new Date());
  const [bonuse, setBonuse] = useState(false);
  const [market, setMarket] = useState(false);
  const [review, setReview] = useState(false);

  //bobur
  const [tg, setTg] = useState("");
  //bobur

  const [timerP, setTimerP] = useState(false);
  const [counts, setCounts] = useState(3);
  const [infoTrans, setInfoTrans] = useState([]);
  const [cryptoDataAll, setCryptoDataAll] = useState([]);

  const decoded = localStorage.getItem("Access")
    ? jwtDecode(localStorage.getItem("Access"))
    : {};
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [productInfo, setProductInfo] = useState([]);
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState("");
  const gameSearch = cryptoDataAll.filter((el) => {
    return (
      el.symbol.toLowerCase().includes(search.toLowerCase()) &&
      el.symbol.toString().substring(3, 7) === "USDT"
    );
  });
  const getUser = async () => {
    await axios
      .get(`https://binomo-backend.onrender.com/users/${decoded.user._id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let cbalance = Math.round(((Number(user.wallet) - 10000) * 100) / 10000 );
  const getInfoTrans = async () => {
    await axios
      .get("http://localhost:7777/transaction")
      .then((res) => {
        setInfoTrans(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getProductsInfo = async () => {
    try {
      const response = await axios.get("http://localhost:7777/coins/");
      setProductInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Event handler for buying
  const handleBuy = () => {
    const initialPrice = cryptoData.price;
    startTimer();
    setTimerP(true);
    // Store initial price in localStorage
    localStorage.setItem("InitialPrice", initialPrice);
    const tradedInfo = {
      id: String(infoTrans.length + 1),
      user: decoded.user._id,
      coin: cryptoData.symbol,
      time: new Date().toLocaleTimeString(),
      amount: countTrade,
      price: initialPrice, // Store initial price
      tradePosition: "Buy",
      newprice: 0,
      profit: 0,
    };
    // Handle buying logic
    const tradedString = {
      tradedcoin: cryptoData.symbol,
      tradedTime: new Date().toLocaleTimeString(),
      tradedMoney: countTrade,
      tradedPrice: initialPrice, // Store initial price
    };
    localStorage.setItem("InfoTrade", JSON.stringify(tradedString));

    axios
      .post("http://localhost:7777/transaction", tradedInfo)
      .then((response) => {
        console.log("Transaction posted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error posting transaction:", error);
        // Handle error
      });

    axios
      .patch(`https://binomo-backend.onrender.com/users/${decoded.user._id}`, {
        wallet: user.wallet - countTrade,
      })
      .then((response) => {
        // Update the user state with the new wallet value returned from the server
        setUser((prevUser) => ({
          ...prevUser,
          wallet: response.data.wallet,
        }));
        // Delayed patch request after one minute
        setTimeout(() => {
          // Retrieve initial price from localStorage
          const storedInitialPrice = localStorage.getItem("InitialPrice");
          const storedInitialTrade = JSON.parse(
            localStorage.getItem("InfoTrade")
          );

          // Fetch updated cryptoData after one minute
          axios
            .get(
              `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`
            )
            .then((response) => {
              const newPrice = response.data.price;

              // Calculate difference between old and new price
              let difference = storedInitialPrice - newPrice;

              // Check if the difference is negative and adjust it
              if (difference >= 0) {
                difference = "-" + Math.abs(difference); // Change first character to '+'
              } else {
                difference = "+" + Math.abs(difference); // Change first character to '+'
              }
              if (difference > 0) {
                const updatedWalletAmount =
                  Number(user.wallet) +
                  (Number(storedInitialTrade.tradedMoney) +
                    Number(storedInitialTrade.tradedMoney) * 0.83);
                axios
                  .patch(
                    `http://localhost:7777/transaction/${infoTrans.length + 1}`,
                    {
                      profit: String(difference),
                      newprice: String(response.data.price),
                    }
                  )
                  .then((response) => {
                    console.log(
                      "Last transaction patched successfully:",
                      response.data
                    );
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.error("Error patching last transaction:", error);
                    // Handle error
                  });
                // Patch user with updated wallet amount
                axios
                  .patch(`https://binomo-backend.onrender.com/users/${decoded.user._id}`, {
                    wallet: updatedWalletAmount,
                  })
                  .then((response) => {
                    // Update the user state with the new wallet value returned from the server
                    setUser((prevUser) => ({
                      ...prevUser,
                      wallet: response.data.wallet,
                    }));
                  })
                  .catch((error) => {
                    console.error("Error updating user wallet:", error);
                    // Handle error
                  });
              } else {
                axios
                  .patch(
                    `http://localhost:7777/transaction/${infoTrans.length + 1}`,
                    {
                      profit: String(difference),
                      newprice: String(response.data.price),
                    }
                  )
                  .then((response) => {
                    console.log(
                      "Last transaction patched successfully:",
                      response.data
                    );
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.error("Error patching last transaction:", error);
                    // Handle error
                  });
              }
            })
            .catch((error) => {
              console.error("Error fetching updated crypto data:", error);
            });
        }, Number(timer) * 10000);
      })
      .catch((error) => {
        console.error("Error updating user wallet:", error);
        // Handle error
      });
  };

  const postReview = () => {
    const message = `
    <b>Review User_id: ${decoded?.user?._id}</b>

    <b>Review Text: ${tg}</b>

    <b>Review Rate: ${counts}</b>
    `;
    const url = `https://api.telegram.org/bot5378253930:AAEW0rlP7j7KA50TxsypNSLLKvQ5jYnNPfc/sendMessage?chat_id=-1002119730772&text=${encodeURIComponent(
      message
    )}`;

    axios
      .post(url)
      .then(() => {
        // If successful, you can perform any necessary actions here, like reloading the page
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error posting review:", error);
        // Handle error
        alert("Failed to post review. Please try again later.");
      });
  };

  const handleSell = () => {
    const initialPrice = cryptoData.price;
    // Store initial price in localStorage
    startTimer();
    setTimerP(true);
    localStorage.setItem("InitialPrice", initialPrice);
    const tradedInfo = {
      id: String(infoTrans.length + 1),
      user: decoded.user._id,
      coin: cryptoData.symbol,
      time: new Date().toLocaleTimeString(),
      amount: countTrade,
      price: initialPrice, // Store initial price
      tradePosition: "Sell",
      profit: 0,
    };
    // Handle buying logic
    const tradedString = {
      tradedcoin: cryptoData.symbol,
      tradedTime: new Date().toLocaleTimeString(),
      tradedMoney: countTrade,
      tradedPrice: initialPrice, // Store initial price
    };
    localStorage.setItem("InfoTrade", JSON.stringify(tradedString));

    axios
      .post("http://localhost:7777/transaction", tradedInfo)
      .then((response) => {
        console.log("Transaction posted successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error posting transaction:", error);
        // Handle error
      });

    axios
      .patch(`https://binomo-backend.onrender.com/users/${decoded.user._id}`, {
        wallet: user.wallet - countTrade,
      })
      .then((response) => {
        // Update the user state with the new wallet value returned from the server
        setUser((prevUser) => ({
          ...prevUser,
          wallet: response.data.wallet,
        }));
        // Delayed patch request after one minute
        setTimeout(() => {
          // Retrieve initial price from localStorage
          const storedInitialPrice = localStorage.getItem("InitialPrice");
          const storedInitialTrade = JSON.parse(
            localStorage.getItem("InfoTrade")
          );

          // Fetch updated cryptoData after one minute
          axios
            .get(
              `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`
            )
            .then((response) => {
              const newPrice = response.data.price;

              // Calculate difference between old and new price
              let difference = newPrice - storedInitialPrice;

              // Check if the difference is negative and adjust it
              
              if (difference < 0) {
                const updatedWalletAmount =
                  Number(user.wallet) +
                  (Number(storedInitialTrade.tradedMoney) +
                    Number(storedInitialTrade.tradedMoney) * 0.83);
                axios
                  .patch(
                    `http://localhost:7777/transaction/${infoTrans.length + 1}`,
                    {
                      profit: String("-" + Math.abs(difference)),
                      newprice: String(response.data.price),
                    }
                  )
                  .then((response) => {
                    console.log(
                      "Last transaction patched successfully:",
                      response.data
                    );
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.error("Error patching last transaction:", error);
                    // Handle error
                  });
                // Patch user with updated wallet amount
                axios
                  .patch(`https://binomo-backend.onrender.com/users/${decoded.user._id}`, {
                    wallet: updatedWalletAmount,
                  })
                  .then((response) => {
                    // Update the user state with the new wallet value returned from the server
                    setUser((prevUser) => ({
                      ...prevUser,
                      wallet: response.data.wallet,
                    }));
                  })
                  .catch((error) => {
                    console.error("Error updating user wallet:", error);
                    // Handle error
                  });
              } else {
                axios
                  .patch(
                    `http://localhost:7777/transaction/${infoTrans.length + 1}`,
                    {
                      profit: String("+" + Math.abs(difference)),
                      newprice: String(response.data.price),
                    }
                  )
                  .then((response) => {
                    console.log(
                      "Last transaction patched successfully:",
                      response.data
                    );
                    window.location.reload();
                  })
                  .catch((error) => {
                    console.error("Error patching last transaction:", error);
                    // Handle error
                  });
              }
            })
            .catch((error) => {
              console.error("Error fetching updated crypto data:", error);
            });
        }, Number(timer) * 10000);
      })
      .catch((error) => {
        console.error("Error updating user wallet:", error);
        // Handle error
      });
  };

  const hGraphChange = () => {
    localStorage.setItem("GraphName", "2");
    window.location.reload();
  };
  const hGraphChange2 = () => {
    localStorage.setItem("GraphName", "1");
    window.location.reload();
  };
  const hGraphChange3 = () => {
    localStorage.setItem("GraphName", "0");
    window.location.reload();
  };
  const hGraphChange4 = () => {
    localStorage.setItem("GraphName", "3");
    window.location.reload();
  };
  const hIntervalChange = () => {
    localStorage.setItem("ChInterval", "1");
    window.location.reload();
  };
  const hIntervalChange1 = () => {
    localStorage.setItem("ChInterval", "60");
    window.location.reload();
  };
  const hIntervalChange2 = () => {
    localStorage.setItem("ChInterval", "D");
    window.location.reload();
  };
  const hIntervalChange3 = () => {
    localStorage.setItem("ChInterval", "3");
    window.location.reload();
  };
  const handleBars = () => {
    if (chartGraph) {
      setChartGraph(false);
    } else {
      setChartGraph(true);
      setMarket(false);
      setBonuse(false);
      setReview(false);
    }
  };
  const handleBonuse = () => {
    if (bonuse) {
      setBonuse(false);
    } else {
      setChartGraph(false);
      setMarket(false);
      setReview(false);
      setBonuse(true);
    }
  };
  const handleReview = () => {
    if (review) {
      setReview(false);
    } else {
      setChartGraph(false);
      setBonuse(false);
      setMarket(false);
      setReview(true);
    }
  };
  const handleSend = () => {
    alert(counts);
  };
  const handleGetB = async () => {
    if (cbalance >= 100) {
      const updatedWalletAmount = user.wallet + 5000; // Increase wallet balance by 5000
      try {
        // Patch user with updated wallet amount
        const response = await axios.patch(
          `https://binomo-backend.onrender.com/users/${decoded.user._id}`,
          {
            wallet: updatedWalletAmount,
          }
        );
        // Update the user state with the new wallet value returned from the server
        setUser((prevUser) => ({
          ...prevUser,
          wallet: response.data.wallet,
        }));
        // Reset cbalance
      } catch (error) {
        console.error("Error updating user wallet:", error);
        // Handle error
      }
    }
  };

  const counterPTrading = () => {
    setCountTrade(countTrade + 5);
  };
  const counterMTrading = () => {
    if (countTrade > 5) {
      setCountTrade(countTrade - 5);
    } else {
      setCountTrade(countTrade);
    }
  };
  const handleTimerP = () => {
    if (timer > 0 && timer < 5) {
      setTimer(timer + 1);
    } else {
      setTimer(timer);
    }
  };
  const handleTimerM = () => {
    if (timer > 1) {
      setTimer(timer - 1);
    } else {
      setTimer(timer);
    }
  };
  const handleMarket = () => {
    if (market) {
      setMarket(false);
    } else {
      setChartGraph(false);
      setBonuse(false);
      setReview(false);
      setMarket(true);
    }
  };
  const getProducts = async () => {
    await axios
      .get("http://localhost:7777/coins")
      .then((res) => {
        setProduct(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setLoadingChart(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    getUser();
    getProducts();
    getProductsInfo();
    getInfoTrans();
    setInterval(() => {
      setTime(new Date());
    }, 1000);

    const fetchCryptoData = async () => {
      try {
        const response = await axios.get(
          `https://api.binance.com/api/v3/ticker/price?symbol=${symbol.toUpperCase()}`
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.binance.com/api/v3/ticker/price"
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
  }, [symbol]);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  const startTimer = () => {
    setIsActive(true);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(60);
  };

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

  const infoTradeData = JSON.parse(localStorage.getItem("InfoTrade"));

  return (
    <>
      <Nav />
      <div className="w-card">
        <div className="cs-wrapper">
          <div className="c-sidebar">
            <div className="s-line">
              <button
                onClick={handleBars}
                style={{ color: chartGraph ? "white" : "#868893" }}
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
            <div className="s-line" onClick={() => navigate("/reyting")}>
              <Link to={"/reyting"}>
                <button className="line">
                  <HiOutlineTrophy className="s-svg"/>
                  <sub>Reyting</sub>
                </button>
              </Link>
            </div>
            <div className="s-line">
              <button className="line" onClick={handleBonuse}>
                <FaGift className="s-svg"/>
                <sub>Bonuses</sub>
              </button>
            </div>
            <div className="s-line">
              <button className="line" onClick={handleMarket}>
                <FaShop className="s-svg"/>
                <sub>Market</sub>
              </button>
            </div>
          </div>
          <div className="cd-sidebar">
            <div className="s-line">
              <button className="line" onClick={handleReview}>
                <BiCommentDetail className="s-svg"/>
                <sub>Review</sub>
              </button>
            </div>
          </div>
        </div>
        <div
          className="csi-wrapper"
          style={{ display: bonuse ? "flex" : "none" }}
        >
          <div className="cs-card">
            <h1>Bonuses</h1>
            <div className="cb-line">
              <div className="bl-line">
                <div className="bl-left">
                  <h2>Profitable</h2>
                  <b>Bonuse for +10000$ balance</b>
                  <b>Amount: +5000$</b>
                </div>
                <div className="bl-right">
                  <button
                    onClick={handleGetB}
                    className={cbalance >= 100 ? "bl-active" : "bl-none"}
                  >
                    Get
                  </button>
                </div>
              </div>
              <span className="bar">
                <span
                  className="profit"
                  style={{ width: `${cbalance}%` }}
                ></span>
              </span>
            </div>
          </div>
        </div>
        <div
          className="csi-wrapper"
          style={{ display: market ? "flex" : "none" }}
        >
          <div className="cm-card">
            <h1>Market</h1>
            <input type="text" onChange={(e) => setSearch(e.target.value)} />
            {loading ? (
              <Skeleton className="coins skeleton" count={6} />
            ) : (
              <div className="mc-coins">
                {productInfo.map((element) => {
                  return (
                    <>
                      {gameSearch
                        .slice(0, 6)
                        .filter(
                          (el) =>
                            el.symbol.toLowerCase() == element.symbol + "usdt"
                        )
                        .map((el) => {
                          return (
                            <div
                              className="mc-line"
                              onClick={() => {
                                navigate(`/coin/${el?.symbol}`);
                                window.location.reload();
                              }}
                            >
                              <img
                                src={productInfo
                                  .filter(
                                    (element) =>
                                      element.symbol + "usdt" ===
                                      el.symbol.toLowerCase()
                                  )
                                  .map((el) => el.image)}
                                alt=""
                              />
                              <h2>
                                {productInfo
                                  .filter(
                                    (element) =>
                                      element.symbol + "usdt" ===
                                      el.symbol.toLowerCase()
                                  )
                                  .map((el) => el.name)}
                              </h2>
                              <b>{el?.price}</b>
                            </div>
                          );
                        })}
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div
          className="csi-wrapper"
          style={{ display: review ? "flex" : "none" }}
        >
          <div className="cr-card">
            <h1 style={{ textAlign: "center" }}>Review and Suggestion</h1>
            <h3>You can write here</h3>
            <input
              value={tg}
              onChange={(e) => setTg(e.target.value)}
              type="text"
            />
            <Rate onChange={(value) => setCounts(value)} defaultValue={3} />
            <button style={{cursor: 'pointer'}} onClick={postReview}>Send</button>
          </div>
        </div>
        <div
          className="csi-wrapper"
          style={{ display: chartGraph ? "flex" : "none" }}
        >
          <div className="t-line">
            <b>Chart Type</b>
            <BsXLg
              style={{ cursor: "pointer" }}
              onClick={() => setChartGraph(false)}
            />
          </div>
          <button className="ch-line" onClick={hGraphChange}>
            <div className="l-line">
              <GoGraph />
              <b>Line</b>
            </div>
            <img
              src="https://binomo.com/assets/platform/images/trading/chart/line.svg"
              alt=""
            />
          </button>
          <button className="ch-line" onClick={hGraphChange2}>
            <div className="l-line">
              <LuCandlestickChart />
              <b>Candle</b>
            </div>
            <img
              src="https://binomo.com/assets/platform/images/trading/chart/candle.svg"
              alt=""
            />
          </button>
          <button className="ch-line" onClick={hGraphChange4}>
            <div className="l-line">
              <LuMountain />
              <b>Mountain</b>
            </div>
            <img
              src="https://binomo.com/assets/platform/images/trading/chart/mountain.svg"
              alt=""
            />
          </button>
          <button className="ch-line" onClick={hGraphChange3}>
            <div className="l-line">
              <FaChartBar />
              <b>Bar</b>
            </div>
            <img
              src="https://binomo.com/assets/platform/images/trading/chart/bar.svg"
              alt=""
            />
          </button>
          <h2>Interval</h2>
          <div className="ch-interval">
            <button onClick={hIntervalChange}>1M</button>
            <button onClick={hIntervalChange1}>5M</button>
            <button onClick={hIntervalChange2}>1H</button>
            <button onClick={hIntervalChange3}>1D</button>
          </div>
        </div>
        <div className="c-chart">
          {loadingChart ? (
            <Skeleton className="skeleton-chart" count={1} />
          ) : (
            <TradingViewPart4
              products={symbol.toUpperCase()}
              namegraph={graphName}
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
              <GoPlus style={{ cursor: "pointer" }} onClick={counterPTrading} />
              <LuMinus
                style={{ cursor: "pointer" }}
                onClick={counterMTrading}
              />
            </div>
          </div>
          <div className="ct-line">
            <div className="ctleft">
              <p>Time</p>
              <b>Minut: {timer}</b>
            </div>
            <div className="ct-right">
              <GoPlus style={{ cursor: "pointer" }} onClick={handleTimerP} />
              <LuMinus style={{ cursor: "pointer" }} onClick={handleTimerM} />
            </div>
          </div>
          {timerP ? (
            <div className="t-timer">
              <h3>{Math.abs(seconds)}s</h3>
              <b>{infoTradeData.tradedcoin}</b>
            </div>
          ) : null}
          <div className="ct-trade">
            <button className="t-buy" onClick={handleBuy}>
              <FaArrowUp />
            </button>
            <button className="t-sell" onClick={handleSell}>
              <FaArrowDown />
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default memo(CryptoDetail);
