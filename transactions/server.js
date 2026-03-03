const express = require('express');
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const cors = require('cors');
const transactionsRouter = require('./routes/transactions');
const axios = require("axios");
const Transaction = require("./models/transaction");
const app = express();
app.use(cors());

app.use(express.json());
app.use('/transactions', transactionsRouter);

const PORT = process.env.PORT || 1000;

mongoose.set('strictQuery', true);

app.listen(PORT, () =>
  console.log('Server:', `http://localhost:${PORT}/transactions`)
);

setInterval(async () => {  
  try {
    const today = new Date()
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
    const openTransactions = await Transaction.find({ status: "open" });
    const trades = await Transaction.deleteMany({
      $or: [
        { endTime: { $lt: startOfToday } },
        { endTime: { $gte: endOfToday } }
      ]
    });
    
    
    for (let trade of openTransactions) {  
      if (Date.now() >= new Date(trade.endTime).getTime()) {        
        const priceResponse = await axios.get(
          `https://api.binance.com/api/v3/ticker/price?symbol=${trade.coin}`
        );
        
        const newPrice = Number(priceResponse.data.price)   
        let percentChange = 0    
        let profit = 0
        
        if (trade.tradePosition === "Buy") {
          percentChange = (newPrice - trade.startPrice) / trade.startPrice
        } else {
          percentChange = (trade.startPrice - newPrice) / trade.startPrice
        }

        profit = trade.amount * percentChange * 100
        trade.endPrice = newPrice;
        trade.profit = profit;
        trade.status = "closed";

        await trade.save();

        if (profit > 0) {

          const winAmount = profit

          try {
            await axios.patch(
              `http://localhost:8000/users/${trade.userId}`,
              {
                $inc: { wallet: winAmount }
              }
            );
          } catch (error) {
            console.log(error, "User wallet didn't change");
          }
        }

        console.log("Trade closed:", trade._id);
      }
    }
  } catch (error) {
    console.log("Auto close error:", error.message);
  }
}, 5000);

const startServer = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL)
      .then(() => console.log('OK!'))
      .catch(() => console.log('ERROR!'));
  } catch (error) {
    console.log(error);
  }
};

startServer();
