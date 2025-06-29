import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components'

const Footer = () => {

    const Wrapper = styled.section`
    margin-top: 15px;
    .foot-panel1{
        background-color: #1a504c;
        color: white;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.85rem;
    }
    
    .foot-panel2{
        background-color: #e5f9f8;
        color: #121414;
        height: 500px;
        display: flex;
        justify-content: space-evenly;
    }
    
    .foot-panel2 ul{
        margin-top: 20px;
    }
    
    .foot-panel2 ul a {
        display: block;
        font-size: 0.85rem;
        margin-top: 10px;
        color: #121414;
    }
    
    .foot-panel2 p{
        color: #121414;
    }
    
    .foot-panel3{
        background-color: #222f3d;
        color: white;
        border-top: 0.5px solid white;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .logo{
        background-image: url(fullLogo.png);
        background-size: cover;
        height: 170px;
       width: 170px;
    }
    
    .foot-panel4{
        background-color: #0f1111;
        color: white;
        height: 100px;
        font-size: 0.7rem;
        text-align: center;
    }
    
    .pages{
       
        padding-top: 25px;
    }
    
    .coppyright{
        padding-top: 5px;
    }
    `;

    const navigate = useNavigate();

    const handleAdminLogin = (event) => {
        event.preventDefault();
        navigate("/admin-login")
    }

    return (
        <Wrapper>
            <div class="foot-panel1">
                Health Plus
            </div>
            <div class="foot-panel2">
                <ul>
                    <p>About Apollo Pharmacy</p>
                    <a>About Us</a>
                    <a> FAQs</a>
                    <a> Find a Pharmacy</a>
                    <a> Careers</a>
                    <a>Contact Us</a>
                    <a>Blogs</a>
                    <a> Health Queries</a>
                    <a> Know Your Health Credits</a>
                    <a>About One Apollo Program</a>
                    <a> Corporate</a>
                    <a>Terms and Conditions</a>
                    <a>Privacy Policy</a>
                    <a>Returns & Refunds</a>
                    <a>Online Doctor App</a>
                </ul>
                <ul>
                    <p>Services</p>
                    <a>Online Doctor Consultation</a>
                    <a> Apollo Pro Health Program</a>
                    <a> All Doctor List</a>
                    <a> Consult Physicians</a>
                    <a>consult Dermatologists</a>
                    <a>Consult Paediatrictcians</a>
                    <a> Consult Gynaecologists</a>
                    <a>Consult Cardiologist</a>
                    <a>Consult Dietitians </a>
                    <a> Consult ENT Specialist</a>
                    <NavLink onClick={(e)=>handleAdminLogin(e)}>Admin Login</NavLink>
                </ul>
                <ul>
                    <p>Book Lab Test At Home</p>
                    <a>RT PCR Test At Home</a>
                    <a> Reneal Profile (KFT ,RFT Test)</a>
                    <a> Find a Pharmacy</a>
                    <a> Hemogran Test</a>
                    <a>Lipid Profile Test</a>
                    <a>Thyroid Profile Test(T3,T4,TSH Test)</a>
                    <a> D Dimer Test</a>
                    <a>Urine Culture Test</a>
                    <a> Complete Blood Count (CBC,Test)</a>
                    <a>Widal Test</a>
                    <a>Liver Function Test(LFT Test)</a>
                </ul>
            </div>

            <div class="foot-panel3">
                <div class="logo"></div>
            </div>

            <div class="foot-panel4">
                <div class="pages">
                    <a>Conditions of Use</a>
                    <a>Privacy Notice</a>
                    <a>Your Ads Privacy Choices</a>
                </div>
                <div class="coppyright">
                    © 1996-2023, Health plus, Inc. or its affiliates
                </div>
            </div>
        </Wrapper>
    )
}

export default Footer