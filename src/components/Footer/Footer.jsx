import './Footer.css'
import { FaInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";


function Footer() {
  return (
    <div className='footer'>
        <p>Copyright @ 2025 - CryptoBag - All Right Reserved.</p>
        <div className='icons'>
          <a href='https://github.com/Aliata73' target='_blank'>
          <FaGithub className='icon' />
          </a>
          <a href='https://instagram.com/atarod_alii' target='_blank'>
            <FaInstagram className='icon' />
          </a>
        </div>
    </div>
  )
}

export default Footer