import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useLocation, useNavigate } from "react-router-dom";
import { IoLocationSharp } from "react-icons/io5";
import { FaBriefcaseMedical } from "react-icons/fa";
import doc from './Doc_Img/Doctor.png'
import { saveDocBookingDataOnServer } from '../Service/Public/Priv_Axios/Payment-service';
import { getDoctorCategoryByDocIdFromServer } from '../Service/Public/Pub_Axios/Doctor-service';
import { sendDoctorBookingMail } from '../Service/Public/Priv_Axios/Email-service';
import Header from '../Navbar/Header';
import { getCurrentUserDetail } from '../LocalStorage';
import { toast } from 'react-toastify';

const Doctors = () => {

    const [login, setLogin] = useState(false)

    useEffect(() => {
        document.body.style.backgroundColor = "#dcdfce"
        let data = localStorage.getItem("data");
        if (data != null) {
            setLogin(true)
        }
    }, [login])

    const navigate = useNavigate()

    const Wrapper = styled.div`
    // background-color: #dcdfce;

    .first-part {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        height:74px;
        margin-bottom: 16px;
        cursor: pointer;
    
    }
    
    .outer-le {
        border: 1px solid #e7e7e5;
        border-radius: 12px;
        padding: 16px;
        width:96%;
        height: 255px;
        background-color: #f7f8f5;
        margin:1px 60px 2px 20px ;
    
    
    
    }
    
    .img-part {
        height: 80px;
        width: 80px;
        flex-shrink: 0;
        margin-right: 12px;
        border: 1px solid #dcdfce;
        border-radius: 12px;
    }
    
    .img-part img {
        height: 100%;
        width: 100%;
    object-fit: contain;
    }
    
    .des-part ,.main {
        color: #121414;
        font-size: 18px;
        line-height: 20px;
        font-weight: 600px;
        padding-top: 8px;
    }
    
    .des-part ,.bottom {
        color: #71716e;
        line-height: 16px;
        font-size: 14px;
        word-break: break-all;
        padding-top: 3px;
        padding-bottom: 2px;
     }
    
    .plus {
        color: #050a4e;
        padding-top: 2px;
        font-size: 14px;
        font-weight: 600px;
        line-height: 20px;
    }
    
    .second-part {
        display: flex;
    align-items: center;
        justify-content: unset;
        margin-top: auto;
    }
    
    .rs {
        padding-top: 2px;
        font-size: 15px;
        justify-content: center;
    }
    
    .bl {
        font-size: 20px;
        line-height: 22px;
        font-weight: 700;
        margin-right: 4px;
    }
    
    
    .add button {
        min-width: 88px;
        width: 200px;
        padding-left: 20px;
        border-radius: 8px;
    
    }
    
    .add {
        position: relative;
        padding-left: 960px;
        bottom: 50px;
    
    }
    .p {
        min-width: 70px;
        height: 32px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 20px;
    }
    
    .l {
        background: #3b82f6;
        border: 1px solid #3b82f6;
        color: #fff;
        cursor: pointer;
    }
    
    .total {
        justify-content: space-between;
        margin-top: 30px;
        margin-bottom: 24px;
        
    }
    
    .h {
        padding-top: 30px;
        margin-left: 7px;
        padding-bottom: 10px;
    }
    
    .address{
        color: #050a4e;
    margin-top: 3px;
    font-size: 14px;
    font-weight: 600px;
    line-height: 20px;
    }
    .c{
        padding-top: 8px;
        font-size: 15px;
        align-items: center;
        margin-top: auto;
    }
    
    .c{
        padding-left: 55px;
    }


    .outer-le {
        /* existing styles */
        transition: transform 0.3s ease;
    }

    .outer-le:hover {
        transform: scale(1.02); /* Increase the scale when hovered */
    }

    button:hover{
        color: red;
        background-color: #050a4e;
    }     
    `;
    const location = useLocation();
    const AllDoctor = location.state;

    const handlePayment = async (event, doctor) => {
        event.preventDefault();

        const user = await getCurrentUserDetail();

        if (login) {

            saveDocBookingDataOnServer({
                detail: doctor.name,
                price: doctor.fee,
                status: "Paid",
                cartType: "3"
            }).then((response) => {

                let option = {
                    key: 'rzp_test_ayVY180uYv1UJf',
                    amount: response.amount,
                    currency: 'INR',
                    name: 'Health Plus',
                    image: "",
                    order_id: response.id,

                    handler: function (response) {
                        console.log(response.rezorpay_payment_id)
                        console.log(response.rezorpay_order_id)
                        console.log(response.rezorpay_signature)
                        console.log('payment successfull')
                        navigate('/');
                    },
                    prefill: {
                        name: user.name,
                        email: user.email,
                        contact: user.phone
                    },
                    notes: {
                        address: "Health Plus"
                    },
                    theme: {
                        color: "#1a504c"
                    }
                };
                let rzp = new window.Razorpay(option);
                rzp.open();                                     //  status


                getDoctorCategoryByDocIdFromServer(doctor.id)
                    .then(response => {

                        let day = (doctor.avail_time).split(",");
                        let user = getCurrentUserDetail();

                        sendDoctorBookingMail({
                            to: (user.email).toString(),
                            subject: "Appointment Approved",                 
                            message: `Hello ${user.name}, this is a reminder of your upcoming appointment with Dr. ${doctor.name} of ${response.name} department on ${day[1]} in between ${day[0]}. Please remember to arrive 10 minutes early and bring your ID and insurance card. We look forward to seeing you!`                   // DOC NAME
                        }).then(response => {


                        }).catch(error => console.log(error))



                    }).catch(error => console.log(error))



            }).catch(error => console.log(error))
        } else {
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
    }

    return (
        <Header>
            <Wrapper className='hi'>
                {
                    AllDoctor.map((data) => (
                        <div className="total">
                            <div className="outer-le">
                                <div className="first-part">
                                    <div className="img-part">
                                        <img src={doc} alt="hi">
                                        </img>
                                    </div>

                                    <div className="des-part">
                                        <p className="main" style={{ color: "#050a4e" }}><b>{data.name}</b></p>
                                        <p className="bottom">{data.degree}</p>
                                    </div>
                                </div>
                                <div className="plus">
                                    <i className="fa-solid fa-briefcase-medical"></i><FaBriefcaseMedical />   {data.med_exp} years
                                </div>
                                <div className="address">
                                    <i className="fa-solid fa-location-dot"></i>< IoLocationSharp /> Health plus Medical Center,Kolkata
                                </div>
                                <div className="second-part">
                                    <p className="rs">
                                        Available at
                                    </p>
                                </div>

                                <div>
                                    {data.avail_time}
                                </div>

                                <div className="add">
                                    <p className="c">
                                        Consulation fees <br />
                                        <span class="bl">₹{data.fee}
                                        </span>
                                        <span className="bl">
                                        </span>
                                    </p>
                                    <a >
                                        <button className="l p" onClick={(e) => handlePayment(e, data)}>
                                            <span>Book Visit</span>
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </Wrapper>
        </Header>
    )
}

export default Doctors