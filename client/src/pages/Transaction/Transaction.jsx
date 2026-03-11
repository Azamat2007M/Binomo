import { useEffect, useState } from 'react'
import './transaction.scss'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import Nav from '../../components/Nav/Nav'
import Footer from '../../components/Footer/Footer'
import imgUrl from '../../assets/b-empty.png'

const Transaction = () => {
    const [infoTrans, setInfoTrans] = useState([])
    const [productInfo, setProductInfo] = useState([])
    const [cryptoDataAll, setCryptoDataAll] = useState([]);
    const [activeTimers, setActiveTimers] = useState({});
    const [isTActive, setIsTActive] = useState(false)
    const decoded = localStorage.getItem("Access")
    ? jwtDecode(localStorage.getItem("Access"))
    : {};
    
    const getProductsInfo = async () => {
        try {
            const response = await axios.get("http://localhost:8000/coins");
            setProductInfo(response.data);
        } catch (error) {
            alert(error);
        }
    };
    
    const getTransaction = async () => {
        try {
            const res = await axios.get('http://localhost:1000/transactions');
            setInfoTrans(res.data);
            
            res.data.forEach((transaction) => {
                if (transaction.status === "open" && new Date(transaction.endTime) > new Date()) {
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
                getTransaction();
            } else {
                setActiveTimers((prev) => ({ ...prev, [id]: diff }));
                setIsTActive(true)
            }
        }, 1000);
    };
    

    useEffect(() => {
        getTransaction()
        getProductsInfo()

        const fetchData = async () => {
            try {
            const response = await axios.get(
                `https://api.binance.com/api/v3/ticker/price`
            );
            setCryptoDataAll(response.data);        
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData()
        
        const interval = setInterval(fetchData, 5000);
        
        return () => clearInterval(interval);
    }, [])
  return (
    <>
        <Nav/>
        <div className="t-wrapper">
            <div className="t-card">
                <h1 className='t-active'>Transaction</h1>
                <div className="t-title">
                    <b>Picture</b>
                    <b>Coin</b>
                    <b>Start Time</b>
                    <b>Start Price</b>
                    <b>Current Price</b>
                    <b>Profit</b>
                    <b>Position</b>
                    <b>Amount</b>
                </div>
                {infoTrans.filter((el) => el?.userId === decoded?.userId).length > 0 ? (
                    <section>
                        {infoTrans.filter((el) => el?.userId === decoded?.userId).reverse().map((el) => {
                            const cryptoFind = cryptoDataAll.find((coin) => coin.symbol == el?.coin)
                            let profitValue = 0;
                            
                            if (cryptoFind && el?.status === "open") {
                                let percentChange = 0;
                                if (el?.tradePosition === "Buy") {
                                    percentChange = (Number(cryptoFind?.price) - Number(el?.startPrice)) / Number(el?.startPrice);
                                } else if (el?.tradePosition === "Sell") {
                                    percentChange = (Number(el?.startPrice) - Number(cryptoFind?.price)) / Number(el?.startPrice);
                                }   
                                profitValue = Number(el?.amount) * percentChange * 100;
                            } else {
                                profitValue = el?.profit ? Number(el?.profit) : 0;
                            }
                            return(
                                <div className="t-liner">
                                    <div className='t-status' style={(el?.status == 'open' && isTActive) ? {display: "block"} : {display: "none"}}><div className='ts-circle'></div></div>
                                    <img src={productInfo.filter((element) => element?.symbol + 'usdt' === el?.coin.toLowerCase()).map((element) => element?.image)} alt="" />
                                    <b className='a-coin'>{el?.coin}</b>
                                    <b>{new Date(el?.startTime).getHours()}:{new Date(el?.startTime).getMinutes() < 10 ? "0"+new Date(el?.startTime).getMinutes() : new Date(el?.startTime).getMinutes()}</b>
                                    <b className='a-coin'>{Number(el?.startPrice).toFixed(2)}$</b>
                                    <b style={{color: el?.tradePosition === "Buy" ? (el?.endPrice ? Number(el?.endPrice) : Number(cryptoFind?.price)) > el?.startPrice ? 'lime' : 'red' : (el?.endPrice ? Number(el?.endPrice) : Number(cryptoFind?.price)) > el?.startPrice ? 'lime' : 'red'}}>{el?.endPrice ? Number(el?.endPrice) : Number(cryptoFind?.price).toFixed(2)}$</b>
                                    <b style={{color: profitValue < 0 ? 'red' : 'lime'}}>{profitValue.toFixed(2)}$</b>
                                    <b style={{color: el?.tradePosition == "Sell" ? 'red' : 'lime'}}>{el?.tradePosition}</b>
                                    <b style={{color: 'yellow'}}>{Number(el?.amount).toFixed(2)}$</b>
                                    <div className="trade-timer" style={(el?.status == 'open' && isTActive) ? {display: "block"} : {display: "none"}}>
                                        {el.status === "open" && isTActive && (
                                            <b>{activeTimers[el._id] || 0}s</b>
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                ) : (
                    <div className="b-empty">
                        <img src={imgUrl} alt='Empty'/>
                    </div>
                )}
            </div>
        </div>
        <Footer/>
    </>
  )
}

export default Transaction