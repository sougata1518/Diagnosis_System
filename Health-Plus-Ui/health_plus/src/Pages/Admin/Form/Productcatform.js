import React, { useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { addProductCateDataFromAdmin } from '../../../Service/Private/Product-service';

const Wrapper=styled.section`
  
.container{
  background-color: #dcdfdc;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgray;
  border-radius: 4px;
  margin: 5px 130px;
  width:800px;
  height:100px;
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
  
}
.file-input-container {
  position: relative;
  overflow: hidden;
  display: inline-block;
}`;

const Productcatform = () => {

     // State variables to hold form data
  const [formData, setFormData] = useState({
    uname: '',
  });
  const navigate = useNavigate();

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addProductCateDataFromAdmin({
      name:formData.uname
    }).then(response=>{
      navigate("/productDetail")
    }).catch(error=>console.log(error))
  };
  

  return (
    <Wrapper>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1 className="main-heading">Product Category</h1>
          <hr/>
          <h2>Add Information</h2>
          <p>Name: *
            <input 
              name="uname" 
              type="text" 
              value={formData.uname}
              onChange={handleInputChange}
            />
          </p>
          <input type="submit" value="submit" />
        </form>
      </div>
    </Wrapper>
  )
}

export default Productcatform