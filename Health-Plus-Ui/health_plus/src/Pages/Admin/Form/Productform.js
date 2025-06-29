import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom';
import { getProductCatDataFromServer } from '../../../Service/Public/Pub_Axios/Product-service';
import { addProductDataFromAdmin, addProductImageDataFromAdmin } from '../../../Service/Private/Product-service';

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

const Productform = () => {
    // State variables to hold form data
    const [formData, setFormData] = useState({
        uname: '',
        uCatagory: 'nivea_skin_care',
        oprice: '',
        dprice: '',
        ddiscount: '',
        dsrc: null
    });
    const [category,setCategory] = useState([]);
    const navigate = useNavigate()

    useEffect(()=>{
        getProductCatDataFromServer().then(response=>{
            setCategory(response)
        }).catch(error=>console.log(error))
    },[])

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputChangeForImage = (e) => {
        setFormData({...formData,dsrc:e.target.files[0]});
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addProductDataFromAdmin({
            name:formData.uname,
            price:formData.oprice,
            dist_per:formData.ddiscount + "%",
            dist_price:formData.dprice
        },formData.uCatagory).then(response=>{
            addProductImageDataFromAdmin(formData.dsrc,response.id,formData.uCatagory)
            .then(response=>{
                navigate("/productDetail")
            }).catch(error=>console.log(error))
        }).catch(error=>console.log(error))
    };
    

    return (
        <Wrapper>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1 className="main-heading">Product Form</h1>
                    <hr />
                    <h2>Add Information</h2>
                    <p>Name: *
                        <input
                            name="uname"
                            type="text"
                            value={formData.uname}
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Catagory:*
                        <select
                            name="uCatagory"
                            onChange={handleInputChange}
                        >
                            {category.map(cate=>(
                                <option value={cate.id}>{cate.name}</option>
                            ))}
                            
                            {/* Add other options here */}
                        </select>
                    </p>
                    <p>Original Price:*
                        <input
                            name="oprice"
                            type="text"
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Discounted Price:*
                        <input
                            name="dprice"
                            type="number"
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Discount(%):*
                        <input
                            name="ddiscount"
                            type="number"
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Img Src:*
                        <input
                            name="dsrc"
                            type="file"
                            onChange={handleInputChangeForImage}
                        />
                    </p>
                    <input type="submit" value="submit" />
                </form>
            </div>
        </Wrapper>
    )
}

export default Productform