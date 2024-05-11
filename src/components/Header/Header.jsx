import React from 'react'
import Slider from "react-slick";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import './header.scss'
import { Link } from 'react-router-dom';

const Header = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <>
        <header>
            <div className="case">
                <div className="banner">
                    <div className="h-left">
                        <h1>Smart investments</h1>
                        <b>Sign up and get $10,000 in a demo account. <br /> Improve your trading skills and open the broad spectrum of financial opportunities with Binomo.</b>
                        {localStorage.getItem('Access') ? (
                            <Link to={'/introductiondemo'}>
                                <button style={{width: '30%'}}>Try Demo</button>
                            </Link>
                        ) : (
                            <Link to={'/login'}>
                                <button style={{width: '30%'}}>Try Demo</button>
                            </Link>
                        )}
                        <b>No registration required</b>
                    </div>
                    <div className="h-right">
                        <div className="h-line">
                            <img src="https://binomo.com/h-assets/shared/assets/images/home/icons/iair-ab4e26da432d20b87bd4.svg" alt="" />
                            <h1>IAIR Awards</h1>
                        </div>
                        <div className="h-line">
                            <img src="https://binomo.com/h-assets/shared/assets/images/home/icons/forex-cf5b79deda1e5b63576a.svg" alt="" />
                            <h1>FE Awards</h1>
                        </div>
                        <div className="h-line">
                            <img src="https://binomo.com/h-assets/shared/assets/images/home/icons/comm-3f7f7ef4dc65b722f65a.svg" alt="" />
                            <h1>Financial <br /> Commission <br /> <span>Category A</span></h1>
                        </div>
                        <div className="h-line">
                            <img src="https://binomo.com/h-assets/shared/assets/images/home/icons/data-provider-fb0a361025cc91897dab.svg" alt="" />
                            <h1>Quotes from <br /> leading agencies</h1>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        <section>
            <div className="case">
                <div className="slider">
                    <h1>Binomo Specials</h1>
                    <Slider {...settings}>
                        <div className="slider-container">
                            <div className='slider-card1'>
                                <b>The new VIP app is now available</b>
                                <h1>Binomo X: Energy of superiority <br /> in trading</h1>
                                <button>Upgrade</button>
                                <img src="https://binomo.com/h-assets/shared/assets/images/home-page/offers/binomo_x/slot-lap-f5219f848f9a5dceb911.png" alt="" />
                            </div>
                        </div>
                        <div className="slider-container">
                            <div className='slider-card2'>
                            <b>Binomo referral program</b>
                                <h1>Invite friends and get up <br /> to $100 to your real account</h1>
                                <button>Learn More</button>
                            </div>
                        </div>
                    </Slider>
                </div>
                <div className="s-count">
                    <h1>856 468</h1>
                    <b>Active traders daily</b>
                    <li></li>
                </div>
                <div className="s-count">
                    <h1>133</h1>
                    <b>Countries of presence</b>
                    <li></li>
                </div>
                <div className="s-count">
                    <h1>28 710 170</h1>
                    <b>Successful trades in the past week</b>
                </div>
            </div>

        </section>
        <section>
            <div className="case">
                <div className="content">
                    <h1>The benefits of the platform</h1>
                    <div className="c-four">
                        <div className="c-item">
                            <img src="https://binomo.com/h-assets/shared/assets/images/home/icons/min-dep-0691133ddde33bd7afb0.svg" alt="" />
                            <h1>Minimum account balance <br /> from $10</h1>
                            <p>Start making trades with minimum investments.</p>
                        </div>
                        <div className="c-item">
                            <img src="https://binomo.com/h-assets/shared/assets/images/home/icons/min-risk-17d121e3813b36a50d3b.svg" alt="" />
                            <h1>Trade amount <br /> starting from $1</h1>
                            <p>The minimum cost of a trade is quite low. You won't lose <br /> a large amount of funds while you're still learning how to trade.</p>
                        </div>
                        <div className="c-item">
                            <img src="https://binomo.com/h-assets/shared/assets/images/home/icons/non-stop-5f2c8e0449b98137c239.svg" alt="" />
                            <h1>A unique mode <br /> of trading: ‘Non-stop’</h1>
                            <p>There are no restrictions on the platform regarding the <br /> number of trades that can be concluded simultaneously. You <br /> can open several positions at the same time and continue <br /> trading.</p>
                        </div>
                        <div className="c-item">
                            <img src="https://binomo.com/h-assets/shared/assets/images/home/icons/several-deals-6b3a867b8fbd9e962a43.svg" alt="" />
                            <h1>Work also <br /> on the weekends</h1>
                            <p>Some quotes sources are available only on working days. We <br /> combined various options for your convenience: trade even on <br /> weekends choosing the most suitable assets.</p>
                        </div>
                    </div>
                    <div className="c-img">
                        <img src="https://binomo.com/h-assets/shared/assets/images/home/images/mobile-dd47d1b3582e2f96e17a.png" alt="" />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Header