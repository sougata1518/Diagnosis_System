import React, { useState } from 'react'
import styled from 'styled-components'
import { useLocation,useNavigate } from "react-router-dom";
import { updateDoctorDataFromAdmin } from '../../../../Service/Private/Doc-service';

const Wrapper = styled.section`
    .container{
        background-color: #dcdfdc;
        padding: 5px 20px 15px 20px;
        border: 1px solid lightgray;
        border-radius: 4px;
        margin: 5px 230px;
        width: 800px;
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

const Docupdateform = () => {

    const location = useLocation();
    const OBJ = location.state;
    const navigate = useNavigate()

    const [data,setData] = useState(OBJ)

    const handleStateChange = (event,field) => {
      event.preventDefault();
      setData({...data,[field]:event.target.value})
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      updateDoctorDataFromAdmin(data.id,data).then(response=>{
        navigate("/doctorDetail")
      }).catch(error=>console.log(error))
    }

  return (
    <Wrapper>
            <div className="container">
                <form onSubmit={(e)=>handleSubmit(e)}>
                    <h1 className="main-heading">Doctor Form</h1>
                    <hr />
                    <h2>Add Information</h2>
                    <p>Name: *
                        <input
                            name="dname"
                            type="text"
                            value={data.name}
                            onChange={(e)=>handleStateChange(e,"name")}
                        />
                    </p>
                    <p>Degree:*
                        <input
                            name="ddegree"
                            type="text"
                            value={data.degree}
                            onChange={(e)=>handleStateChange(e,"degree")}
                        />
                    </p>
                    <p>Year Of Experience:*
                        <input
                            name="dexp"
                            type="number"
                            value={data.med_exp}
                            onChange={(e)=>handleStateChange(e,"med_exp")}
                        />
                    </p>
                    <p>Day and Time: *
                        <input
                            name="dday"
                            type="text"
                            value={data.avail_time}
                            onChange={(e)=>handleStateChange(e,"avail_time")}
                        />
                    </p>
                    <p>Fees *
                        <input
                            name="dfees"
                            type="number"
                            value={data.fee}
                            onChange={(e)=>handleStateChange(e,"fee")}
                        />
                    </p>
                    <input type="submit" value="submit" />
                </form>
            </div>
        </Wrapper>
  )
}

export default Docupdateform