import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import { getLabTestCatDataFromServer } from '../../../Service/Public/Pub_Axios/Labtest-service';
import { addLabTestDataFromAdmin, addLabTestImageFromAdmin } from '../../../Service/Private/Lab-service';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.section`
.container{
    background-color: #dcdfdc;
    padding: 5px 20px 15px 20px;
    border: 1px solid lightgray;
    border-radius: 4px;
    height: 800px;
    width:800px;
    margin:5px 130px;
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

    // State variables to hold form data
    const [formData, setFormData] = useState({
        tname: '',
        tdepartment: '',
        toprice: '',
        ttest_include: '',
        tdprice: '',
        tdiscount: '',
        imgsrc: null
    });
    const [department, setDepartment] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        getLabTestCatDataFromServer()
          .then(response => {
            if (Array.isArray(response)) { // Check if the response is an array
              setDepartment(response);
            } else {
              console.error("Unexpected response format: ", response);
            }
          })
          .catch(error => console.log(error));
      }, []);

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleInputChangeForImage = (e) => {
        setFormData({...formData,imgsrc:e.target.files[0]})
    }

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addLabTestDataFromAdmin({
            name:formData.tname,
            test_include:formData.ttest_include,
            mainPrice:formData.toprice,
            distPer:formData.tdiscount,
            distPrice:formData.tdprice
        },formData.tdepartment).then(response=>{
            addLabTestImageFromAdmin(formData.imgsrc,response.id,formData.tdepartment)
            .then(resp=>{
                navigate("/labTestDetail")
            }).catch(error=>console.log(error))
        }).catch(error=>console.log(error))
    };
    

    return (
        <Wrapper>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1 className="main-heading">Lab Test Form</h1>
                    <hr />
                    <h2>Add Information</h2>
                    <p>Test Name: *
                        <input
                            name="tname"
                            type="text"
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Department:*
                        <select
                            name="tdepartment"
                            onChange={handleInputChange}
                        >
                            {department.map(depart=>(
                                <option value={depart.id}>{depart.name}</option>
                            ))}
                            
                            {/* Add other options here */}
                        </select>
                    </p>
                    <p>Original Price:*
                        <input
                            name="toprice"
                            type="text"
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Test Include:*
                        <input
                            name="ttest_include"
                            type="text"
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Discounted Price:*
                        <input
                            name="tdprice"
                            type="number"
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Discount(%):*
                        <input
                            name="tdiscount"
                            type="text"
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Img src:*
                        <input
                            type="file"
                            onChange={(e) => handleInputChangeForImage(e)}
                        />
                    </p>
                    <input type="submit" value="submit" />
                </form>
            </div>
        </Wrapper>
    )
}

export default Labtestform