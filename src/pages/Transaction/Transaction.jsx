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
    const decoded = localStorage.getItem("Access")
    ? jwtDecode(localStorage.getItem("Access"))
    : {};
    const getTransaction = async () => {
        await axios
            .get('http://localhost:7777/transaction')
            .then((res) => {
                setInfoTrans(res.data);
            })
            .catch((err) => {
                alert(err);
            })
    }
    const getProductsInfo = async () => {
        try {
          const response = await axios.get("http://localhost:7777/coins/");
          setProductInfo(response.data);
        } catch (error) {
          alert(error);
        }
      };
      console.log(infoTrans);
    useEffect(() => {
        getTransaction()
        getProductsInfo()
    }, [])
  return (
    <>
        <Nav/>  
        <div className="t-wrapper">
            <div className="t-card">
                <h1 className='t-active'>Transaction</h1>
                {infoTrans.filter((el) => el?.user === decoded?.user?._id).length > 0 ? (
                    <section>
                        {infoTrans.filter((el) => el?.user === decoded?.user?._id).reverse().map((el) => {
                        return(
                            <div className="t-liner">
                                <img src={productInfo.filter((element) => element?.symbol + 'usdt' === el?.coin.toLowerCase()).map((element) => element?.image)} alt="" />
                                <b className='a-coin'>{el?.coin}</b>
                                <b>{el?.time}</b>
                                <b>{Number(el?.price).toFixed(2)}$</b>
                                <b>{Number(el?.newprice).toFixed(2)}$</b>
                                <b style={{color: el?.profit[0] == '-' ? 'red' : 'lime'}}>{Number(el?.profit).toFixed(2)}$</b>
                                <b className='a-coin'>{el?.tradePosition}</b>
                                {(el?.profit[0] === '-' && el?.tradePosition === 'Sell') ? (
                                    <b style={{color: 'lime'}}>+{Number(el?.amount + el?.amount* 0.83).toFixed(2)}$</b>
                                ) : (el?.profit[0] === '-' && el?.tradePosition === 'Buy') ? (
                                    <b style={{color: 'red'}}>-{Number(el?.amount).toFixed(2)}$</b>
                                ) : (el?.profit[0] !== '-' && el?.tradePosition === 'Buy') ? (
                                    <b style={{color: 'lime'}}>+{Number(el?.amount + el?.amount* 0.83).toFixed(2)}$</b>
                                ) : (
                                    <b style={{color: 'red'}}>-{Number(el?.amount).toFixed(2)}$</b>
                                )}
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