import { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

    const {allCoin, currency} = useContext(CoinContext)
    const [displayCoin, setDisplayCoin] = useState([])

    const [input, setInput] = useState('')

    const inputHandler = (e) => {
        setInput(e.target.value)
        if (e.target.value === ""){
            setDisplayCoin(allCoin)
        }
    }

    const searchHandler = async (e) => {
        e.preventDefault()
        const coins = await allCoin.filter((item) => {
            return item.name.toLowerCase().includes(input.toLocaleLowerCase())
        })
        setDisplayCoin(coins)
    }

    useEffect(()=> {
        setDisplayCoin(allCoin)
    }, [allCoin])
  return (
    <div  className='home'>
        <div className="hero">
            <h1>بازار بزرگ <br /> ارزهای دیجیتال</h1>
            <p>به بزرگترین بازار ارزهای دیجیتال جهان خوش آمدید.همین حالا ثبت‌نام کنید و به دنیای ارزهای دیجیتال بپیوندید</p>
            <form dir='rtl' onSubmit={searchHandler}>
                <input style={{padding: '4px'}}  onChange={inputHandler} list='coinlist' value={input} type="text" placeholder='ارز مورد نظر را وارد کنید ...' required />
                
                <datalist id='coinlist'>
                    {allCoin.map((item, index) => (<option key={index} value={item.name} />))}
                </datalist>
                
                <button type='submit'>جستجو</button>
            </form>
        </div>
        <div dir='rtl' className="crypto-table">
            <div className="table-layout">
                <p>#</p>
                <p>بازار</p>
                <p style={{textAlign:"left"}}>آخرین قیمت</p>
                <p  style={{textAlign:"center"}}>تغییرات(24h)</p>
                <p style={{textAlign:"left"}} className='market-cap'>حجم معاملات(24h)</p>
            </div>
            {
                displayCoin.slice(0, 10).map((item, index) => (
                    <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                        <p>{item.market_cap_rank}</p>
                        <div>
                            <img src={item.image} alt="" />
                            <p>{item.name } {currency.symbol === "تومان" ? <span className='symbol-custom'>/ تومان</span>: ""}</p>
                            
                        </div>
                        <p dir='ltr'>{currency.symbol !== 'تومان' ? "$" : ""} {item.current_price.toLocaleString()}</p>
                        <p dir='ltr' className={item.price_change_percentage_24h > 0 ? "green":"red" }>
                            {Math.floor(item.price_change_percentage_24h*100)/100}
                            </p>
                        <p style={{textAlign:"left"}} dir='ltr' className='market-cap'>{currency.symbol !== 'تومان' ? "$" : ""} {item.market_cap.toLocaleString()}</p>
                    </Link>
                ))
            }
        </div>
    </div>
  )
}

export default Home