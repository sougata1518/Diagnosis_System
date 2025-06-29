import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getProductDataFromServer } from '../Service/Public/Pub_Axios/Product-service'
import { saveCartDataByHandlingSave } from '../Service/Public/Priv_Axios/Cart-service'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../Service/Public/Helper'
import { toast } from 'react-toastify'

const Wrapper = styled.div`
    display: grid;
    /* ak ta line card anar jone use kora hoy */
    grid-template-columns: repeat(4, 1fr); 
    gap: 44px;
    margin-bottom: 20px;
    margin-left: 55px;
    margin-right: 20px; /* Center aligning the grid */

    .outer-le {
        border: 1px solid #e7e7e5;
        border-radius: 12px;
        padding: 16px;
        margin-top:40px;
        width: 210px;
        background-color: #e5f9f8;
        transition: all 0.3s ease; /* Adding transition for smooth hover effect */
         box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adding box shadow */
    }

    .outer-le:hover {
        transform: scale(1.05); /* Increasing size on hover */
        box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2); /* Increasing box shadow on hover */
    }

    .img-part {
        height: 170px;
        width: 170px;
        margin-right: 12px;
        border: 1px solid #e7e7e5;
        border-radius: 20px;
    }

    .img-part img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }

    .des-part  {
        padding-top:20px;
        padding-bottom:10px ;
        color: #121414;
        font-size: 15px;
        line-height: 20px;
        font-weight: 600px;
    }

    .rs {
        display: flex;
        align-items: center;
        padding-bottom:18px ;

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
        min-width: 160px;
        border-radius: 8px;
        transition: all 0.3s ease; /* Adding transition for smooth hover effect */

    }

    .add button:hover {
        background-color: #106c89; /* Changing background color on hover */
        border-color: #106c89; /* Changing border color on hover */
    }

    .productBtn {
        min-width: 70px;
        height: 32px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 20px;
    }

    .l {
        background: #155653;
        border: 1px solid #106c89;
        color: #ffffff;
        cursor: pointer;
    }
    `;

const Products = ({ data }) => {

    const navigate = useNavigate();

    const [login, setLogin] = useState(false)

    useEffect(() => {
        document.body.style.backgroundColor = "#fff"
        let data = localStorage.getItem("data");
        if (data != null) {
            setLogin(true)
        }
    }, [login]);

    const setProductDataInState = (id) => {
        if (login) {
            getProductDataFromServer(id).then((response) => {
                saveCartDataByHandlingSave(
                    {
                        img: response.img,
                        name: response.name,
                        main_price: response.dist_price,
                        quantity: '1',
                        total_price: response.dist_price,
                        cartType: '2'
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
            })
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
        <Wrapper>
            {
                data.map((data) => (
                    <div class="outer-le">
                        <div class="img-part">
                            <img src={BASE_URL+'/serve/image/'+data.img} alt="hi" />
                        </div>
                        <div class="des-part">
                            <p class="main"><b>{data.name}</b></p>

                        </div>

                        <p class="rs">
                            <span class="bl">₹{data.dist_price}</span>
                            <span class="cl">{data.dist_per}</span>
                            <span class="dl">₹{data.price}</span>
                        </p>
                        <div class="add">
                            <button class="l productBtn" onClick={() => setProductDataInState(data.id)}>
                                <span>Add</span>
                            </button>
                        </div>
                    </div>
                ))
            }
        </Wrapper>
    )
}

export default Products