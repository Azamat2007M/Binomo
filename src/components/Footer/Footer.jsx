import React from 'react'
import { FaCcMastercard } from "react-icons/fa";
import { RiVisaLine } from "react-icons/ri";
import { LiaCcJcb } from "react-icons/lia";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

import './footer.scss'

const Footer = () => {
  return (
    <>
        <footer>
            <div className="case">
                <div className="foot">
                    <div className="f-top">
                      <div className="line">
                        <h1>VIP</h1>
                      </div>
                      <div className="line">
                        <h1>FOR TRADERS</h1>
                        <h2>Tournaments</h2>
                        <h2>Promotions</h2>
                        <h2>Strategies</h2>
                        <h2>Binomo Blog</h2>
                      </div>
                      <div className="line">
                        <h1>Binomo Blog</h1>
                        <h2>Help Center</h2>
                      </div>
                      <div className="line">
                        <h1>INFORMATION</h1>
                        <h2>Statuses</h2>
                        <h2>About us</h2>
                        <h2>Regulations</h2>
                        <h2>Client Agreement</h2>
                        <h2>Affiliate program</h2>
                        <h2>AML policy</h2>
                      </div>
                    </div>
                    <div className="f-center">
                      <div className="fc-left">
                      <h1>Binomo is a category A member of the International Financial Commission, which guarantees the company's customers quality of service, transparency of relations, and protection from a neutral and independent dispute resolution organization.</h1>
                      <div className="cards">
                        <FaCcMastercard />
                        <RiVisaLine />
                        <LiaCcJcb />
                      </div>
                      </div>
                      <div className="fc-right">
                        <h1>Contacts</h1>
                        <p>support@binomo.com <br />
Dolphin Corp LLC <br />
Euro House, Richmond Hill Road, Kingstown, St. Vincent and <br />  Grenadines</p>
                      </div>
                    </div>
                    <div className="f-bottom">
                      <div className="apps">
                      <FaYoutube className='a-circle'/>
                      <FaInstagram className='a-circle'/>
                      <FaTwitter className='a-circle'/>
                      <FaTelegramPlane className='a-circle'/>
                      <FaFacebookF className='a-circle'/>
                      </div>
                      <a href="https://binomo.com/information/privacy">Privacy Policy</a><br /><br /> 
                      <b>© 2014-2024 Binomo. All rights reserved</b>
                      <h1>The financial operations offered on this site may involve increased risk. By using the financial services and tools this site offers, you may suffer serious financial loss, or completely lose the funds in your guaranteed trading account. Please evaluate all the financial risks and seek advice from an independent financial advisor before trading. Binomo is not responsible for any direct, indirect or consequential losses, or any other damages resulting from the user's actions on this site.



</h1>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer