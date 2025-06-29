import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getDoctorCatFromServer } from '../../../Service/Public/Pub_Axios/Doctor-service';
import { addDoctorFromAdmin } from '../../../Service/Private/Doc-service';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.section`
    .container{
        background-color: #dcdfdc;
        padding: 5px 20px 15px 20px;
        border: 1px solid lightgray;
        border-radius: 4px;
        margin: 5px 150px;
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

const Doctorform = () => {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        dname: '',
        ddepartment: 'general_physician',
        ddegree: '',
        dexp: '',
        dday: '',
        dfees: ''
    });
    const [category,setCategory] = useState([])

    useEffect(()=>{
        getDoctorCatFromServer().then(response=>{
            setCategory(response);
        }).catch(error=>console.log(error))
    },[])

    // Function to handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here
        addDoctorFromAdmin({
            name:formData.dname,
            degree:formData.ddegree,
            med_exp:formData.dexp,
            avail_time:formData.dday,
            fee:formData.dfees
        },formData.ddepartment).then(response=>{
            navigate("/doctorDetail");
        }).catch(error=>console.log(error))
    };

    

    return (
        <Wrapper>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h1 className="main-heading">Doctor Form</h1>
                    <hr />
                    <h2>Add Information</h2>
                    <p>Name: *
                        <input
                            name="dname"
                            type="text"
                            value={formData.dname}
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Department:*
                        
                        <select
                            name="ddepartment"
                            value={formData.ddepartment}
                            onChange={handleInputChange}
                        >
                            {category.map(cate=>(
                                <option value={cate.id}>{cate.name}</option>
                            ))}
                            
                            {/* Add other options here */}
                        </select>
                    </p>
                    <p>Degree:*
                        <input
                            name="ddegree"
                            type="text"
                            value={formData.ddegree}
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Year Of Experience:*
                        <input
                            name="dexp"
                            type="number"
                            value={formData.dexp}
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Day and Time: *
                        <input
                            name="dday"
                            type="text"
                            value={formData.dday}
                            onChange={handleInputChange}
                        />
                    </p>
                    <p>Fees *
                        <input
                            name="dfees"
                            type="number"
                            value={formData.dfees}
                            onChange={handleInputChange}
                        />
                    </p>
                    <input type="submit" value="submit" />
                </form>
            </div>
        </Wrapper>
    )
}

export default Doctorform