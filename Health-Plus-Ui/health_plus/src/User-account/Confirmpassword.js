import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom'
import { UpdatePassword } from '../Service/Public/Pub_Axios/User-service';
import { toast } from 'react-toastify';

const Wrapper = styled.section`
    .set-new-password-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #1a504c;
    }
    
    .set-new-password-form {
        background: white;
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        width: 500px;
        height:370px;
    }
    
    .set-new-password-form h2 {
        margin-bottom: 20px;
        text-align: center;
    }

    .form-group{
        margin-bottom:10px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
    }
    
    .form-group input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    
    button {
        width: 100%;
        padding: 10px;
        background-color: #1a504c;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    
    button:hover {
        color:#1a504c;
        background-color: #fff;
        border:1px solid;
    }
    
    .message {
        margin-top: 15px;
        text-align: center;
        color: red;
    }
    `;

const Confirmpassword = () => {
    const location = useLocation();
    const OBJ = location.state;
    const navigate = useNavigate()


    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage('Passwords do not match!');
        } else {
            UpdatePassword({
                email:OBJ,
                password:password
            }).then(response=>{
                toast.success("Password updated sucessfully !!", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined
                })
                navigate("/user-login")
            }).catch(error=>console.log(error))
        }
    };

    return (
        <Wrapper>
            <div className="set-new-password-container">
                <form onSubmit={handleSubmit} className="set-new-password-form">
                    <h2 style={{ fontSize: "30px" , color:"#1a504c"}}>Set New Password</h2>
                    
                    {message && <p className="message" style={{fontSize:"16px"}}>{message}</p>}
                    <div style={{marginTop:"50px"}}>
                        <div className="form-group">
                            <label htmlFor="password" style={{color:"#1a504c"}}>New Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword" style={{color:"#1a504c"}}>Confirm New Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit">Set Password</button>
                    
                </form>
            </div>
        </Wrapper>
    )
}

export default Confirmpassword