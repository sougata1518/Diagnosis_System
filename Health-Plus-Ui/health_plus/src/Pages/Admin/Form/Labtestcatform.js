import React, { useState } from 'react';
import styled from 'styled-components'
import { addImageOnLabCategoryFromAdmin, addLabTestCateFromAdmin } from '../../../Service/Public/Pub_Axios/Labtest-service';
import { useNavigate } from 'react-router-dom';

const Wrapper=styled.section`
  
.container{
  background-color: #dcdfdc;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgray;
  border-radius: 4px;
  height: 400px;
  width:800px;
  margin: 5px 130px;

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

const Labtestcatform = () => {

  const navigate = useNavigate()
  const [data,setData] = useState({
    name:'',
    img:null
  })

  const handleInputChange = (e) => {
    setData({...data,name:e.target.value})
  }

  const handleInputChangeForImage = (e) => {
    setData({...data,img:e.target.files[0]});
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    addLabTestCateFromAdmin({
      name:data.name
    }).then(response=>{
      addImageOnLabCategoryFromAdmin(data.img,response.id).then(resp=>{
        navigate("/labTestDetail")
      }).catch(error=>console.log(error))
      
    }).catch(error=>console.log(error))
  }


  return (
    <Wrapper>
    <div className="container">
      <form onSubmit={(e)=>handleSubmit(e)}>
        <h1 className="main-heading">Lab Test Category</h1>
        <hr />
        <h2>Add Information</h2>
        <p>Test Name: *
          <input 
            type="text" 
            onChange={(e)=>handleInputChange(e)}
          />
        </p>
        <p>Img src:*
          <input 
            type="file"
            onChange={(e)=>handleInputChangeForImage(e)}
          />
        </p>
        <input type="submit" value="submit"/>
      </form>
    </div>
    </Wrapper>
  )
}

export default Labtestcatform