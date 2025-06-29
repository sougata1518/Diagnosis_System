import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import { updateProductDataFromAdmin } from '../../../../Service/Private/Product-service';

const Wrapper = styled.section`
  .container {
    background-color: #dcdfdc;
    padding: 5px 20px 15px 20px;
    border: 1px solid lightgray;
    border-radius: 4px;
    margin:5px 100px;
    width:900px;
}

input[type="text"],
input[type="email"],
input[type="number"],
input[type="password"],
input[type="date"],
select,
textarea{
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
}
fieldset{
    background-color: #fff;
}

.main-heading{
    text-align: center;
}

input[type="submit"] {
    background-color: #4daea1;
    color: white;
    padding: 12px 20px;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    height:50px;

}

input[type="submit"]:hover{
    background-color:#156f6c;
    
}`;

const Productupdateform = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const OBJ = location.state;

    const [data,setData] = useState(OBJ);

    const handleSubmit = (event) => {
        event.preventDefault();
        updateProductDataFromAdmin(data.id,data).then(response=>{
            navigate("/productDetail")
        }).catch(error=>console.log(error))
    }

    const handleStateData = (event,field) => {
        setData({
            ...data,[field]:event.target.value
        })
    }

  return (
    <Wrapper>
            <div className="container">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <h1 className="main-heading">Product Form</h1>
                    <hr />
                    <h2>Add Information</h2>
                    <p>Name: *
                        <input
                            name="uname"
                            type="text"
                            value={data.name}
                            onChange={(e)=>handleStateData(e,"name")}
                        />
                    </p>
                    <p>Original Price:*
                        <input
                            name="oprice"
                            type="text"
                            value={data.price}
                            onChange={(e)=>handleStateData(e,"price")}
                        />
                    </p>
                    <p>Discounted Price:*
                        <input
                            name="dprice"
                            type="number"
                            value={data.dist_price}
                            onChange={(e)=>handleStateData(e,"dist_price")}
                        />
                    </p>
                    <p>Discount(%):*
                        <input
                            name="ddiscount"
                            type="text"
                            value={data.dist_per}
                            onChange={(e)=>handleStateData(e,"dist_per")}
                        />
                    </p>
                    <input type="submit" value="submit" />
                </form>
            </div>
        </Wrapper>
  )
}

export default Productupdateform