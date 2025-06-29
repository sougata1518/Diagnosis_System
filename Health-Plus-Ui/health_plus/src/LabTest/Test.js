import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation,useNavigate } from "react-router-dom";
import { getLabTestDataByIdFromServer } from '../Service/Public/Pub_Axios/Labtest-service';
import { saveCartDataByHandlingSave } from '../Service/Public/Priv_Axios/Cart-service';
import Header from '../Navbar/Header';
import { BASE_URL } from '../Service/Public/Helper';
import { toast } from 'react-toastify';

const Test = () => {

    const navigate = useNavigate();

    const [login, setLogin] = useState(false)

    useEffect(() => {
        document.body.style.backgroundColor = "#fff"
        let data = localStorage.getItem("data");
        if (data != null) {
            setLogin(true)
        }
    }, [login]);

    const setLabTestDataInState = (id) => {

        if (login) {
            getLabTestDataByIdFromServer(id).then((response) => {

                saveCartDataByHandlingSave(
                    {
                        img: response.img,
                        name: response.name,
                        main_price: response.distPrice,
                        quantity: '1',
                        total_price: response.distPrice,
                        cartType: '1'
                    }
                ).then((response) => {
                    toast.success("Added to cart !!",{
                        position:"top-center",
                        autoClose:5000,
                        hideProgressBar:false,
                        closeOnClick:true,
                        pauseOnHover:true,
                        draggable:true,
                        progress:undefined
                    })
                }).catch(error => {
                    console.log(error);
                })

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


    }

    const Wrapper = styled.div`

    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Adjusted grid columns */
    gap: 30px;
    padding: 70px;
    justify-content: space-around; /* Center align items horizontally */
    justify-content: space-evenly; /* Equal space between cards */
    // max-width: 1200px; /* Added max-width for better responsiveness */


    .first-part {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        margin-bottom: 16px;
        cursor: pointer;
    }

    .outer-le {
        border: 1px solid #e7e7e5;
        border-radius: 12px;
        padding: 16px;
        box-sizing: border-box; /* Include padding and border in width calculation */
        flex-shrink: 0; /* Prevent cards from shrinking */
        transition: all 0.3s ease; /* Transition effect for hover */
        cursor: pointer; /* Change cursor on hover */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add box shadow */

        display: flex;
        flex-direction: column; /* Adjusted flex direction */
        align-items: flex-start;
        justify-content: flex-start;
        margin-bottom: 16px;
        cursor: pointer;
        width: 360px; /* Ensure each card occupies full width */
        // max-width: 300px; /* Added max-width for better responsiveness */
    }
    }

    .outer-le:hover {
        transform: scale(1.05); /* Enlarge the card on hover */
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Change box shadow on hover */
        z-index: 1; /* Ensure the hovered card appears on top of others */
    }


    .img-part {
        height: 80px;
        width: 80px;
        flex-shrink: 0;
        margin-right: 12px;
        border: 1px solid #e7e7e5;
        border-radius: 12px;
    }

    .img-part img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }

    .des-part .main {
        color: #121414;
        font-size: 18px;
        line-height: 20px;
        font-weight: 600;
    }

    .des-part .bottom {
        color: #71716e;
        line-height: 16px;
        font-size: 14px;
        word-break: break-all;
        padding-bottom: 2px;
    }

    .second-part {
        display: flex;
        align-items: center;
        justify-content: space-between; /* Adjusted spacing */
        margin-top: 40px;
    }

    .rs {
        display: flex;
        align-items: center;
        justify-content: unset;
        margin-top: auto;
    }

    .bl {
        font-size: 20px;
        line-height: 22px;
        font-weight: 700;
        margin-right: 4px;
    }

    .cl {
        font-size: 13px;
        font-weight: 400;
        color: #71716e;
        text-decoration: line-through;
        margin-right: 4px;
        margin-top: 2px;
    }

    .dl {
        color: #198754;
        font-size: 15px;
        font-weight: 700;
        margin-right: 4px;
    }

    .add button {
        min-width: 88px;
        justify-content: center;
        border-radius: 8px;
    }

    .add {
        position: relative;
        padding-left: 90px;
    }

    .p {
        min-width: 70px;
        height: 32px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 20px;
    }

    .l {
        background: #106c89;
        border: 1px solid #106c89;
        color: #fff;
        cursor: pointer;
    }
            
    `;

    const location = useLocation();
    const labData = location.state;

    return (
        <Header>
            <div>
                <Wrapper>
                    {
                        labData.map((data) => (
                            <div class="outer-le">
                                <div class="first-part">
                                    <div class="img-part">
                                        <img src={BASE_URL+'/serve/image/'+data.img} alt="Full body checkup icon" />
                                    </div>
                                    <div class="des-part">
                                        <p class="main"><b>{data.name}</b></p>
                                        <p class="bottom">{data.test_include} Tests included</p>
                                    </div>
                                </div>
                                <div class="second-part">
                                    <p class="rs">
                                        <span class="bl">₹{data.distPrice}</span>
                                        <span class="cl">(₹{data.mainPrice})</span>
                                        <span class="dl">{data.distPer}%off</span>
                                    </p>
                                    <div class="add">
                                        <button class="l p" onClick={() => setLabTestDataInState(data.id)}>
                                            <span>Add</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Wrapper>
            </div>
        </Header>
    )
}

export default Test