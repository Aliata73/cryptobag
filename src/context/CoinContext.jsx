import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [usdToToman, setUsdToToman] = useState(null);
  const [currency, setCurrency] = useState({
    name: "irr",
    symbol: "تومان",
  });

  const fetchUsdToToman = async () => {
    fetch("https://api.exir.io/v1/ticker?symbol=usdt-irt")
      .then((response) => response.json())
      .then((data) => {
        const usdPrice = data.last;
        setUsdToToman(usdPrice);
      })
      .catch((err) => console.log(err));
  };

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_COIN_GECKO_API,
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        if (currency.name === "irr") {
          const convertedCoins = response.map((coin) => ({
            ...coin,
            current_price: Math.floor(coin.current_price * usdToToman),
            market_cap: coin.market_cap * usdToToman,
            total_volume: coin.total_volume * usdToToman,
          }));
          setAllCoin(convertedCoins);
        } else {
          setAllCoin(response);
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    fetchUsdToToman();
    fetchAllCoin();
  }, [currency, usdToToman]);

  const contextValue = {
    allCoin,
    currency,
    setCurrency,
    usdToToman
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
