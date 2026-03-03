import { useState, useEffect } from 'react';
import './cryptodatafetch.scss'
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const CryptoDataFetcher = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/coins");
      setProduct(res.data);
    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
        setCryptoData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
    getProducts();
  }, []);
  
  return (
    <>
    <Nav/>
    <main>
      <div className="case">
        <div className="bb-baner">
          <div className="bb-left">
            <h1>Buy, Create & <br /> Sell Crypto Currencies</h1>
            <p>You can trade Cryptocurrency with demo wallet live</p>
            <button>Trade</button>
          </div>
          <div className="bb-left"></div>
        </div>
      </div>
    </main>
    <div className="cf-wrapper">
      <div className="case">
        <h1 style={{textAlign: 'center', color: 'white'}}>Cryptocurrency Prices</h1>
        {loading ? (
            <Skeleton className='coins skeleton' count={227} />    
        ) : (
          <section>
            {product.map((element) => {
              return(
                <div className='c-wrapper' key={element._id}>
                  {cryptoData.filter((el) => el.symbol.toString().substring(3,7) === 'USDT' && el.symbol.toLowerCase() == element.symbol + 'usdt').map((data) => (
                    <div className='coins' onClick={() => {
                      navigate(`/coin/${data.symbol}`)
                      window.location.reload()
                    }} key={data?.symbol}>
                      <img src={product.filter((el) => el.symbol + 'usdt' === data.symbol.toLowerCase()).map((el) => el.image)} alt={`${data.symbol} logo`} width="20" height="20" />
                      <h5>{product.filter((el) => el.symbol + 'usdt' === data.symbol.toLowerCase()).map((el) => el.name) || {some}}</h5> 
                      <b style={{width: '70px'}}>${Number(data.price).toFixed(3)}</b>
                  </div>
                  ))}
              </div>
              )
            })}
          </section>
        )}
          </div>
        </div>
      <Footer/>
    </>
  );
};

export default CryptoDataFetcher;