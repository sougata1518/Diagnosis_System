import React,{useEffect, useState} from 'react'
import styled from 'styled-components'
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { loginUserDataFromServer } from '../../Service/Public/Pub_Axios/User-service';
import { useNavigate } from 'react-router-dom';
import { doLogin } from '../../LocalStorage';

const Wrapper = styled.section`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  

.wrapper {
   width:400px;
   margin: 100px 400px;
    background: #fff; 
   border: solid 2px rgba(255, 255, 255, .2);
   backdrop-filter: blur(4.5px);
   box-shadow: 0 0 10px rgba(0 , 0 , 0 , .2);
   color: black;
   border-radius: 10px;
   padding: 30px 40px;
}

.wrapper h1 {
   font-size: 36px;
   text-align: center;
}

.wrapper .input-box{
    position: relative;
    width: 100%;
    height: 50px;
    margin: 30px 0;
}

.input-box input {
   width: 100%;
   height: 100%;
   background: #fff;
   outline: none;
   border: 3px solid rgba(93, 91, 91, 0.444);
   border-radius: 40px;
   font-size: 16px;
   color: black;
   padding: 20px 45px 20px 20px;
}

.input-box input::placeholder {
   color: black;
}

.input-box .icon{
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color:#1a504c;
}


.wrapper button {
    width: 100%;
    height: 45px;
    background: #1a504c;
    border: none;
    outline: none;
    border-radius: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);
    cursor: pointer;
    font-size: 16px;
    color: #fff;
    font-weight: 700;
}

.wrapper button:hover{
    background:#fff;
    border:1px solid;
    color:#1a504c;
    font-size:bold;
}
`;

const Adminlogin = () => {

    useEffect(()=>{
        document.body.style.backgroundColor="#1a504c"
      },[])

      const [login,setLogin] = useState({
        email:'',
        password:''
      })
      const navigate = useNavigate()

      const handleChangeState = (event,field) => {
        event.preventDefault();
        setLogin({
            ...login,[field]:event.target.value
        })
      }

      const handleSubmit = (event) => {
        event.preventDefault()

        loginUserDataFromServer(login).then(response=>{
            doLogin(response,() => {
                navigate("/AdminPage")
            })
        }).catch(error=>console.log(error))
      }

  return (
    <Wrapper>
        <div className="wrapper">  
            <form onSubmit={(e)=>handleSubmit(e)}>
                <h1>Admin Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Username" 
                    onChange={(e)=>handleChangeState(e,"email")}
                    required/> 
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" 
                    onChange={(e)=>handleChangeState(e,"password")} 
                    required/>
                    <FaLock className="icon"/> 
                </div>
               <button type="submit" >Log In</button>                
            </form>
        </div>
    </Wrapper>
  )
}

export default Adminlogin