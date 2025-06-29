import React,{useEffect,useState} from 'react'
import Navbarfirst from './Navbarfirst'
import Navbarsecond from './Navbarsecond'
import { getCartDataFromTheServer } from '../Service/Public/Priv_Axios/Cart-service'
import Footer from '../Component/Footer'

const Header = ({children}) => {

  const [length,setLength] = useState([0]);

  useEffect(() => {
    getCartDataFromTheServer().then((response) => {
        setLength(response.length);
    }).catch(error=>{
        console.log(error);
    })
  })

  return (
    <div>
        <Navbarfirst data={length} />
        <Navbarsecond />
        {children}
        <Footer />
    </div>
  )
}

export default Header