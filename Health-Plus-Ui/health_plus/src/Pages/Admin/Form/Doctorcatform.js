import React, { useState } from 'react';
import styled from 'styled-components'
import { addDoctorCategoryFromAdmin, addImageOnDocCategoryFromAdmin } from '../../../Service/Private/Doc-service';
import {useNavigate} from 'react-router-dom'

const Wrapper = styled.section`
  
.container{
  background-color: #dcdfdc;
  padding: 5px 20px 15px 20px;
  border: 1px solid lightgray;
  border-radius: 4px;
  width: 800px;
  height:200px;
  margin: 5px 150px;
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
.abc{
  width: 300px;
}`;

const Doctorcatform = () => {

  const navigate = useNavigate();

    // State variables to hold form data
    const [formData, setFormData] = useState({
        dname: '',
        imgsrc: null
    });

    // Function to handle form input changes
    const handleInputChange = (e) => {
        setFormData({ ...formData, dname: e.target.value });
    };

    const handleInputChangeForImage = (e) => {
      setFormData({ ...formData, imgsrc: e.target.files[0] });
  };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here
        addDoctorCategoryFromAdmin({
          name:formData.dname
        }).then(response=>{
          addImageOnDocCategoryFromAdmin(formData.imgsrc,response.id).then(resp=>{
            navigate("/doctorDetail")
          }).catch(error=>console.log(error))
        }).catch(error=>console.log(error))
    };
    

    return (
        <Wrapper>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1 className="main-heading">Doctor Category</h1>
                    <hr />
                    <h2>Add Information</h2>
                    <p>Name: *
                        <input
                            type="text"
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Img src:*<br />
                        <input className='abc'
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

export default Doctorcatform