import { useState } from 'react'
import './introdemos.scss'
import { IoCloseOutline } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import TradingView from '../IntroChartTradingView/TradingView';
import { Link, useNavigate } from 'react-router-dom';

const IntroDemoSection = () => {
    const [ next, setNext ] = useState(1)
    const navigate = useNavigate();

    return (
        <>
            <div className='i-sec1'>
                <div className="case">
                    <div className="i-ptp">
                        <Link to={'/'} className="i-ptleft">
                            <img src="/Logo2.png" alt="" />
                            <b>binomo</b>
                        </Link>
                        <div className="i-ptright">
                            <b>{next}/3</b>
                            <button className="i-skip" onClick={() => {
                                navigate('/')
                                window.location.reload()
                            }}>
                                <IoCloseOutline />
                            </button>
                        </div>
                    </div>
                    {(next === 1) ? (
                        <div className="i-part2">
                            <img src="/n-banner.jpg" alt="" />
                            <div className="i-portbottom1">
                                <h1>Earn with us</h1>
                                <b>You’ll have 70+ popular assets with profitability of up to 90%. Trade and make <br /> your balance grow</b><br />
                                <button onClick={() => setNext(2)}>Next <FaArrowRightLong className='i-arrow'/></button>
                            </div>
                        </div>
                    ) :  (next === 2) ? (
                        <div className="i-part2">
                            <img src="/n-banner2.jpg" alt="" />
                            <div className="i-portbottom1">
                                <h1>Grow from zero to pro</h1>
                                <b>Boost your knowledge with our education and support 24/7. Experiment without <br /> risk; don’t be afraid to trade – we got your back</b><br />
                                <button onClick={() => setNext(3)}>Next <FaArrowRightLong className='i-arrow'/></button>
                            </div>
                        </div>
                    ) : (
                        <div className="i-part2">
                            <div className="i-chart">
                                <TradingView/>
                            </div>
                            <div className="i-portbottom1">
                                <h1>Try it right now</h1>
                                <b>Predict a price direction, make a trade, and wait a bit. If the price goes in your <br /> direction, you’ll profit!</b><br />
                                <button onClick={() => {
                                    navigate('/')
                                }}>Next <FaArrowRightLong className='i-arrow'/></button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default IntroDemoSection