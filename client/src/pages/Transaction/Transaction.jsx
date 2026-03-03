import React, { useEffect, useState } from 'react'
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
    const decoded = localStorage.getItem("Access")
    ? jwtDecode(localStorage.getItem("Access"))
    : {};
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
    
    const getProductsInfo = async () => {
        try {
            const response = await axios.get("http://localhost:8000/coins");
            setProductInfo(response.data);
        } catch (error) {
            alert(error);
        }
    };
    console.log(cryptoDataAll);
    

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
    }, [])
  return (
    <>
        <Nav/>  
        <div className="t-wrapper">
            <div className="t-card">
                <h1 className='t-active'>Transaction</h1>
                {infoTrans.filter((el) => el?.userId === decoded?.userId).length > 0 ? (
                    <section>
                        {infoTrans.filter((el) => el?.userId === decoded?.userId).reverse().map((el) => {
                            const cryptoFind = cryptoDataAll.find((coin) => coin.symbol == el?.coin)
                            let percentChange;
                            let profit;
                            if (el?.tradePosition === "Buy") {
                                percentChange = (cryptoFind?.price - el?.startPrice) / el?.startPrice
                            } else {
                                percentChange = (el?.startPrice - cryptoFind?.price) / el?.startPrice
                            } 
                            profit = el?.amount * percentChange * 100
                            return(
                                <div className="t-liner">
                                    <div className='t-status' style={(el?.status == 'open') ? {display: "block"} : {display: "none"}}><div className='ts-circle'></div></div>
                                    <img src={productInfo.filter((element) => element?.symbol + 'usdt' === el?.coin.toLowerCase()).map((element) => element?.image)} alt="" />
                                    <b className='a-coin'>{el?.coin}</b>
                                    <b>{new Date(el?.startTime).getHours()}:{new Date(el?.startTime).getMinutes() < 10 ? "0"+new Date(el?.startTime).getMinutes() : new Date(el?.startTime).getMinutes()}</b>
                                    <b className='a-coin'>{Number(el?.startPrice).toFixed(2)}$</b>
                                    <b style={{color: el?.startPrice > el?.endPrice || el?.startPrice >= cryptoFind?.price ? 'red' : 'lime'}}>{el?.endPrice ? Number(el?.endPrice) : Number(cryptoFind?.price).toFixed(2)}$</b>
                                    <b style={{color: String(el?.profit)[0] == '-' || String(profit)[0] == '-' ? 'red' : 'lime'}}>{el?.profit ? Number(el?.profit).toFixed(2) : Number(profit).toFixed(2)}$</b>
                                    <b style={{color: el?.tradePosition == "Sell" ? 'red' : 'lime'}}>{el?.tradePosition}</b>
                                    <b style={{color: 'yellow'}}>{Number(el?.amount).toFixed(2)}$</b>
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