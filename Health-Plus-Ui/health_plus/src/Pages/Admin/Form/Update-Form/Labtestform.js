import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation,useNavigate } from 'react-router-dom'
import { updateLabTestDataFromAdmin } from '../../../../Service/Private/Lab-service';

const Wrapper = styled.section`
.container{
    background-color: #dcdfdc;
    padding: 5px 20px 15px 20px;
    border: 1px solid lightgray;
    border-radius: 4px;
    height: 800px;
    width:800px;
    margin:5px 150px;
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

const Labtestform = () => {

    const location = useLocation();
    const OBJ = location.state;
    const navigate = useNavigate();

    const [data,setData] = useState(OBJ)

    const handleStateData = (event,field) => {
        setData({
            ...data,[field]:event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        updateLabTestDataFromAdmin(data.id,data).then(response=>{
            navigate("/labTestDetail")
        }).catch(error=>console.log(error))
    }

  return (
    <Wrapper>
            <div className="container">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <h1 className="main-heading">Lab Test Form</h1>
                    <hr />
                    <h2>Add Information</h2>
                    <p>Test Name: *
                        <input
                            name="tname"
                            type="text"
                            value={data.name}
                            onChange={(e)=>handleStateData(e,"name")}
                        />
                    </p>
                    <p>Original Price:*
                        <input
                            name="toprice"
                            type="text"
                            value={data.mainPrice}
                            onChange={(e)=>handleStateData(e,"mainPrice")}
                        />
                    </p>
                    <p>Test Include:*
                        <input
                            name="ttest_include"
                            type="text"
                            value={data.test_include}
                            onChange={(e)=>handleStateData(e,"test_include")}
                        />
                    </p>
                    <p>Discounted Price:*
                        <input
                            name="tdprice"
                            type="number"
                            value={data.distPrice}
                            onChange={(e)=>handleStateData(e,"distPrice")}
                        />
                    </p>
                    <p>Discount(%):*
                        <input
                            name="tdiscount"
                            type="text"
                            value={data.distPer}
                            onChange={(e)=>handleStateData(e,"distPer")}
                        />
                    </p>
                    <input type="submit" value="submit" />
                </form>
            </div>
        </Wrapper>
  )
}

export default Labtestform