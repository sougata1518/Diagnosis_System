import React, { useEffect, useState } from 'react'
import { Button } from 'reactstrap';
import { getProductCatDataFromServer } from '../../Service/Public/Pub_Axios/Product-service';
import Productaccordian from '../../Pages/Admin/Productaccordian';
import { useNavigate } from 'react-router-dom'

const Productdetail = () => {

    const [data,setData] = useState([]);
    const navigate = useNavigate()
    const columnData = ["Serial No", "Product Name", "Price", "Discounted percentage(%)", "Discounted Price"];

    useEffect(()=>{
        getProductCatDataFromServer().then(response=>{
            setData(response)
        }).catch(error=>console.log(error))
    },[]);

    const handleAdd = (event) => {
      event.preventDefault();
      navigate("/addProductDetail")
      
    }

  return (
    // <div>{JSON.stringify(data)}</div>
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", marginLeft: "480px" }}>
        <h1 style={{ color: "#156f6c", fontSize: "30px" }}>Product Details</h1>
        <Button
          style={{ backgroundColor: "#156f6c", color: "#fff", border: "2px solid black", marginLeft: "300px", height: "50px", width: "200px" }} onClick={(e)=>handleAdd(e)}
        >
          Add Product
        </Button>
      </div>
      <hr />
      {/* {JSON.stringify(data)} */}

      <Productaccordian columnData={columnData} data={data} />
    
    </div>
  )
}

export default Productdetail