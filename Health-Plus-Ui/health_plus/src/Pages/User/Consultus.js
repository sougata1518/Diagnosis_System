import React, { useState, useEffect } from 'react'
import './Consultus.css'
import { postConsultUsDataToServer } from '../../Service/Public/Pub_Axios/Consult-us'
import { useNavigate } from 'react-router-dom';
import Header from '../../Navbar/Header';
import { getCurrentUserDetail } from '../../LocalStorage';
import { sendDoctorBookingMail } from '../../Service/Public/Priv_Axios/Email-service';
import { toast } from 'react-toastify';

const Consultus = () => {

    const navigate = useNavigate()

    useEffect(() => {
        document.body.style.backgroundColor = "#dcdfce"
        let data = localStorage.getItem("data");
        if(data != null){
            setLogin(true)
        }
    }, [])

    const [showMedicalConditions, setShowMedicalConditions] = useState(false);
    const [showMedications, setShowMedications] = useState(false);

    // Define state variables for form data
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        address: '',
        email: '',
        number: '',
        medical_conditions: '',
        current_medications: '',
        reason: '',
        app_date: '',
        consultation_time: ''
    });
    const [login,setLogin] = useState(false)

    // Event handler to update state and control visibility of medical conditions section
    const handleConditionsChange = (event) => {
        const conditionsValue = event.target.value;
        setShowMedicalConditions(conditionsValue === 'yes');
        // Update form data
        setFormData(prevState => ({
            ...prevState,
            conditions: conditionsValue
        }));
    };

    // Event handler to update state and control visibility of medications section
    const handleMedicationsChange = (event) => {
        const medicationsValue = event.target.value;
        setShowMedications(medicationsValue === 'yes');
        // Update form data
        setFormData(prevState => ({
            ...prevState,
            medications: medicationsValue
        }));
    };

    // Event handler to update form data on input change
    const handleChange = (event, field) => {
        const actualData = event.target.value;
        setFormData({
            ...formData, [field]: actualData
        })
    };

    // Event handler for form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const user = await getCurrentUserDetail();

        if(login){
            postConsultUsDataToServer(formData).then((response) => {
                sendDoctorBookingMail({
                    to:(user.email).toString(),
                    subject:"Consultation Booked",
                    message:`Hii ${user.name},
                    This is a reminder that you have a medical consultation scheduled on ${formData.app_date} at ${formData.consultation_time}.
                    For your medical queries or issues , we will call you shortly.`
                }).then(resp=>{
                    navigate("/")
                }).catch(error=>console.log(error))
            }).catch((error) => {
                console.log(error);
            })
        }else{
            toast.error("Please login to proceed further !!",{
                position:"top-center",
                autoClose:5000,
                hideProgressBar:false,
                closeOnClick:true,
                pauseOnHover:true,
                draggable:true,
                progress:undefined
            })
            navigate("/user-login")
        }
    };
    return (

        <Header>
            <div className="Consult_container">
                <form onSubmit={handleSubmit}>
                    <h1 className="main-heading" style={{ fontSize: "30px" }}>Consult Us</h1>
                    <hr />
                    <h2 style={{ marginTop: "10px" }}>Patient Details</h2>

                    <p>Full Name:*
                        <input type="text" name="name" className="input" value={formData.name} onChange={(e) => handleChange(e, 'name')} placeholder="Enter your name" required />
                    </p>

                    <p>Date of Birth:* <input type="date" name="exp_date" className='date-time' onChange={(e) => handleChange(e, 'dob')} required />
                    </p>

                    <p>Address:*</p>
                    <textarea name='address' placeholder='Enter your address' onChange={(e) => handleChange(e, 'address')} rows={5}></textarea>

                    <p>Email:*
                        <input type='email' name='email' required className="input" onChange={(e) => handleChange(e, 'email')} placeholder='Enter your Email Id' />
                    </p>

                    <p>Phone Number:*
                        <input type='number' name='number' className="input" onChange={(e) => handleChange(e, 'number')} placeholder='Enter your phone number' required />
                    </p>

                    <p>
                        <fieldset>
                            <legend>Gender*</legend>
                            Male <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={(e) => handleChange(e, 'gender')} required />
                            Female <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={(e) => handleChange(e, 'gender')} required />
                        </fieldset>
                    </p>

                    <h2>Medical History</h2>
                    <p>Do you have any existing medical conditions*</p>
                    <fieldset>
                        <label>
                            Yes <input type="radio" name="conditions" value="yes" checked={formData.conditions === 'yes'} onChange={handleConditionsChange} required />
                        </label>
                        <label>
                            No <input type="radio" name="conditions" value="no" checked={formData.conditions === 'no'} onChange={handleConditionsChange} required />
                        </label>
                    </fieldset>
                    {showMedicalConditions && (
                        <div>
                            <p>
                                Please describe your existing medical conditions:
                                <textarea onChange={(e) => handleChange(e, 'medical_conditions')} placeholder="Enter your medical conditions" name="medical_conditions" cols="100" rows="5"></textarea>
                            </p>
                        </div>
                    )}
                    <p>Are you currently taking any medications*</p>
                    <fieldset>
                        <label>
                            Yes <input type="radio" name="medications" checked={formData.medications === 'yes'} onChange={handleMedicationsChange} value="yes" required />
                        </label>
                        <label>
                            No <input type="radio" name="medications" checked={formData.medications === 'no'} onChange={handleMedicationsChange} value="no" required />
                        </label>
                    </fieldset>
                    {showMedications && (
                        <div>
                            <p>
                                Please list the medications you are currently taking:
                                <textarea onChange={(e) => handleChange(e, 'current_medications')} placeholder="Enter your medications" name="current_medications" rows="5" />
                            </p>
                        </div>
                    )}
                    <p>
                        Reason for Consultation:
                    </p>
                    <p>
                        <textarea onChange={(e) => handleChange(e, 'reason')} placeholder='Briefly describe your health concern or reason for consultation:' name='Reason' className="input" cols={"100"} rows={"5"}></textarea>
                    </p>
                    <p>
                        <h2>Appointment Information</h2>
                    </p>
                    <p>
                        preferred Date for Consultation:* <input type='date' name='app-date' onChange={(e) => handleChange(e, 'app_date')} className='date-time' required />
                    </p>
                    <p>
                        Preferred Time for Consultation:*
                        <select
                            name='consultation_time' onChange={(e) => handleChange(e, 'consultation_time')} required> <option values="">--Select Time--</option>
                            <option value={"10:00 am"}>10:00 am </option>
                            <option value={"11:00 am"}>11:00 am </option>
                            <option value={"2:30 pm"}>2:30 pm </option>
                            <option value={"4:00 pm"}>4:00 pm </option>
                        </select>

                    </p>
                    <button className="Consult_btn">Submit</button>
                </form>
            </div>
        </Header>
    )
}

export default Consultus