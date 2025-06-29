import React,{useEffect} from 'react'
import './Css/Aminhomepage.css'
import { MdOutlineLogout } from "react-icons/md";
import Detailcard from '../../Pages/Admin/Detailcard';
import { useNavigate } from 'react-router-dom';
import { doLogout } from '../../LocalStorage';

const Adminhomepage = () => {

    const navigate = useNavigate()

    useEffect(()=>{
        document.body.style.backgroundColor="#dcdfce"
      },[])

      const logOut = (event) => {
        event.preventDefault();
        doLogout(()=>{
          navigate("/")
        })
      }

  return (
    <div>
        <ul className='navAd second-nav'>
            <h1 style={{color:"#fff"}}>Admin Page</h1>
            <div className='logdiv'>
                <MdOutlineLogout onClick={(e)=>logOut(e)} className='logout' />
            </div>
        </ul>
        <Detailcard />
    </div>
  )
}

export default Adminhomepage