import { useParams } from "react-router-dom";
import "./Coin.css";
import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/CoinContext";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [histData, setHistData] = useState(null);
  const { currency, usdToToman } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_COIN_GECKO_API,
      },
    };

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((response) => response.json())
      .then((response) => {
        if (currency.name === "irr") {
          const convertedCoins = {
            ...response,
            market_data: {
              ...response.market_data,
              current_price: {
                ...response.market_data.current_price,
                irr: Math.floor(
                  response.market_data.current_price.usd * usdToToman
                ),
              },
              market_cap: {
                ...response.market_data.market_cap,
                irr: Math.floor(
                  response.market_data.market_cap.usd * usdToToman
                ),
              },
              high_24h: {
                ...response.market_data.high_24h,
                irr: Math.floor(response.market_data.high_24h.usd * usdToToman),
              },
              low_24h: {
                ...response.market_data.low_24h,
                irr: Math.floor(response.market_data.low_24h.usd * usdToToman),
              },
            },
          };
          setCoinData(convertedCoins);
        } else {
          setCoinData(response);
        }
      })
      .catch((err) => console.log(err));
  };

  const fetchHistData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_COIN_GECKO_API,
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistData();
  }, [currency, usdToToman]);

  if (!coinData || !histData) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  const currentPrice =
    currency.name === "irr"
      ? coinData.market_data.current_price.irr
      : coinData.market_data.current_price.usd;
  const marketCap =
    currency.name === "irr"
      ? coinData.market_data.market_cap.irr
      : coinData.market_data.market_cap.usd;
  const high24h =
    currency.name === "irr"
      ? coinData.market_data.high_24h.irr
      : coinData.market_data.high_24h.usd;
  const low24h =
    currency.name === "irr"
      ? coinData.market_data.low_24h.irr
      : coinData.market_data.low_24h.usd;
  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt="" />
        <p>
          <b>
            {coinData.name} ({coinData.symbol})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <LineChart histData={histData} />
      </div>

      <div dir="rtl" className="coin-info">
        <ul>
          <li>رتبه در بازار</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>آخرین قیمت</li>
          <li>
            {currency.name === "usd" ? "$" : ""}
            {currentPrice.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>حجم معاملات</li>
          <li>
            {currency.name === "usd" ? "$" : ""}
            {marketCap.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>بیشترین قیمت (۲۴h)</li>
          <li>
            {currency.name === "usd" ? "$" : ""}
            {high24h.toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>کمترین قیمت (۲۴h)</li>
          <li>
            {currency.name === "usd" ? "$" : ""}
            {low24h.toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
