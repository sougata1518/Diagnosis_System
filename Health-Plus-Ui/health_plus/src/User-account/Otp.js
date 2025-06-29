import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { sentOtpToMailThroughServer } from '../Service/Public/Priv_Axios/Email-service';

const Wrapper = styled.section`
  /* src/OTPInput.css */
  .page-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #1a504c; /* Light background color */
  }

  .otp-container {
       width:500px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px;
      border: 2px solid #ccc; /* Border around the OTP section */
      border-radius: 10px;
      background-color: white; /* Background color for the OTP section */
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Optional: shadow for better visual */
  }

  .otp-inputs {
      display: flex;
      gap: 10px;
      margin-top: 10px;
  }

  .otp-inputs input {
      width: 50px;
      height: 50px;
      text-align: center;
      font-size: 24px;
      border: 1px solid #ccc;
      border-radius: 5px;
  }

  .normal-input {
      width: 200px;
      height: 10px;
      padding: 5px;
      margin-bottom: 20px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
  }

  .verify-button {
      margin-top: 20px;
      padding: 10px 20px;
      font-size: 16px;
      background-color: #1a504c;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
  }

  .verify-button:hover {
      background-color: #fff;
      color:#1a504c;
      border:2px solid;
  }

  .timer {
      margin-top: 20px;
      font-size: 18px;
  }
  .time-over{
    color:#1a504c;
    cursor:pointer;
  }

  .time-over:hover {
      color: red;
      text-decoration:underline;
  }
`;

const Otp = () => {

    const location = useLocation();
    const courseOBJ = location.state;
    const navigate = useNavigate();

    const [data , setData] = useState(courseOBJ);

    const [otp, setOtp] = useState(new Array(4).fill(""));
    const [timer, setTimer] = useState(20); // 30 seconds countdown
    const [timeOver, setTimeOver] = useState(false);
    const inputRefs = useRef([]);

    useEffect(() => {
        const countdown = setInterval(() => {
          setTimer(prev => {
            if (prev === 1) {
              clearInterval(countdown);
              setTimeOver(true);
            }
            return prev - 1;
          });
        }, 1000);
    
        // Clear OTP from localStorage after 50 seconds
        const clearOtpTimeout = setTimeout(() => {
          localStorage.removeItem('otp');
        }, 50000);
    
        return () => {
          clearInterval(countdown);
          clearTimeout(clearOtpTimeout);
        };
      },[]);

    const handleChange = (element, index) => {
        if (isNaN(element.value)) return false;

        setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

        // Focus next input
        if (element.nextSibling && element.value) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === "Backspace") {
            if (otp[index] === "") {
                if (index !== 0) {
                    inputRefs.current[index - 1].focus();
                }
            } else {
                setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
            }
        }
    };

    const isOtp = ()=>{
        let otp = localStorage.getItem('otp');
        if(otp == null){
            return false;
        }else{
            return true;
        }
    }

    const ResendOtp = (event) =>{
        // event.preventDefault();
        if(isOtp()){
            localStorage.removeItem('otp')
        }
        sentOtpToMailThroughServer({
            email:data.email
        }).then(response=>{
            localStorage.setItem('otp',response);
            setTimeoutForResend();
        })
    }

    const setTimeoutForResend = () => {
        setTimeout(()=>{
            localStorage.removeItem('otp');
        },50000);
    }

    const handleSubmit = () => {
        const uOtp = otp.join(""); 
        const realOtp = localStorage.getItem('otp');
        if(uOtp === realOtp){
            console.log("matched");                          // redirect to new password page
            navigate("/confirmpass",{ state: data.email })
        }else{
            toast.error("Entered OTP is wrong !!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        }
        // alert(`Entered OTP is: ${otp.join("")}`);
    };

    return (
        <Wrapper>
            <div className="page-container">
                <div className="otp-container">
                    <h2 style={{fontSize:"1.25rem",color:"#1a504c",fontWeight:"500",fontWeight:"bold"}}>OTP Verification</h2>
                    <p style={{color:"#1a504c",margin:"15px"}}><div style={{textAlign:"center",color:"#787777b4",fontSize:"15px",marginBottom:"10px",marginTop:"15px"}}>Enter the OTP sent to</div> {data.email}</p>
                    <div className="otp-inputs">
                        {otp.map((data, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={data}
                                onChange={e => handleChange(e.target, index)}
                                onKeyDown={e => handleKeyDown(e, index)}
                                onFocus={e => e.target.select()}
                                ref={el => inputRefs.current[index] = el}
                            />
                        ))}
                    </div>
                    <button onClick={handleSubmit} className="verify-button">Verify OTP</button>
                    <div className="timer">
                        {timeOver ? <span className="time-over" onClick={(e)=>ResendOtp(e)}>Resend otp</span> : <span>Time Remaining: {timer}s</span>}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Otp