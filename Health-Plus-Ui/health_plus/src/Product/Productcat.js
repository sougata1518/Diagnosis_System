import React, { useEffect,useState } from 'react'
import { getProductCatDataFromServer } from '../Service/Public/Pub_Axios/Product-service'
import Allproduct from './Allproduct';
import Header from '../Navbar/Header';

const Productcat = () => {

    const [data,setData] = useState([]);

    useEffect(
        ()=>{
            getProductCatDataFromServer().then((data)=>{
                setData(data);
            }).catch(error=>{
                console.log(error);
            })
        },
        []
    )

  return (
    <div>
        <Header>
            <Allproduct data={data} />
        </Header>
    </div>
  )
}

export default Productcat