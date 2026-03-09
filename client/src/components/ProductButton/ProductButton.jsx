import { useState } from "react";
import axios from "axios";
import { FaArrowUp } from "react-icons/fa6";
import { FaArrowDown } from "react-icons/fa6";
import "../../pages/Product/product.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const ProductButton = ({userId, coin, amount, tradePosition, onTradeCreated, duration}) => {
  const [loading, setLoading] = useState(false);

  const handleTrade = async () => {
    setLoading(true);
    try {
      const getTrans = await axios.get("http://localhost:1000/transactions")
      if (getTrans.data.find((el) => el.status == "open" && el.userId === userId)) {
        toast.warning("You already have an open deal!", {
          autoClose: 3000,
          style: {
            background: "red",
            color: "white",
          },
        });
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
      toast.success(`✅ ${tradePosition.toUpperCase()} successfully executed!`, {
        autoClose: 3000,
        style: {
          background: "#1e7e34",
          color: "white",
        },
      });

      if (onTradeCreated) onTradeCreated(trade)

    } catch (err) {
      console.error("Error creating trade:", err);
      toast.error("❌ Error creating trade!", {
        autoClose: 3000,
      });
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
      <ToastContainer position="top-right" />
    </>
  )
}

export default ProductButton