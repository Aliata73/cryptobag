import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { useContext } from 'react'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

function Navbar() {

  const {setCurrency} = useContext(CoinContext)

  const currencyHandler = (event) =>{
    switch(event.target.value){
      case "irr":{
        setCurrency({name: "irr", symbol:"تومان"})
        break
      }
      case "usd":{
        setCurrency({name: "usd", symbol:"$"})
        break
      }
      default:{
        setCurrency({name: 'irr', symbol:"تومان"})
        break
      }
    }
  }
  return (
    <div dir='rtl' className='navbar'>
       <Link to={'/'}> <img className='logo' src={logo} alt="" /></Link>
        <ul>
        <Link to={'/'}> <li>صفحه اصلی</li></Link>
            <li>معاملات</li>
            <li>بازار</li>
            <li>بلاگ</li>
        </ul>
        <div className="navbar-right">
            <select onChange={currencyHandler}>
                <option value="irr">تومان</option>
                <option value="usd">USD</option>
            </select>
            <button>ثبت نام <img src={arrow_icon} alt="" /></button>
        </div>
    </div>
  )
}

export default Navbar