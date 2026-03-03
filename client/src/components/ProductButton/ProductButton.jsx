import { useState } from "react";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import "../../pages/Product/product.scss";

const ProductButton = ({userId, coin, amount, tradePosition, onTradeCreated, duration}) => {
  const [loading, setLoading] = useState(false);

  const handleTrade = async () => {
    setLoading(true);
    try {
      const getTrans = await axios.get("http://localhost:1000/transactions")
      if (getTrans.data.find((el) => el.status == "open")) {
        return false
      }
      
      const response = await axios.post("http://localhost:1000/transactions", {
        userId,
        coin,           
        amount,         
        tradePosition,  
        duration
      });

      const trade = response.data;

      console.log("Trade created:", trade);

      if (onTradeCreated) onTradeCreated(trade);

    } catch (err) {
      console.error("Error creating trade:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {tradePosition == "Buy" ? 
        <button className="t-buy" onClick={handleTrade} disabled={loading}>
        {loading ? <>
          <div className="loadingio-spinner-spinner-2by998twmg8"><div className="ldio-yzaezf3dcmj">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div></div>
          <div className="loading-space"></div>
        </> : <FaArrowUp />}
      </button>
      : 
      <button className="t-sell" onClick={handleTrade} disabled={loading}>
        {loading ? <>
          <div className="loadingio-spinner-spinner-2by998twmg8"><div className="ldio-yzaezf3dcmj">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div></div>
          <div className="loading-space"></div>
        </> : <FaArrowDown />}
      </button>
      }
    </>
  )
}

export default ProductButton