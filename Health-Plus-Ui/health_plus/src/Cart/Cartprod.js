import React, { useEffect, useState } from 'react'
import './ProdCart.css'
import './Incredecre.css'
import { handleRazorPay } from './Razor--pay';
import { useNavigate } from 'react-router-dom';

import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { deleteCartData, getCartDataFromTheServer, updateCartDataToServer } from '../Service/Public/Priv_Axios/Cart-service';
import { BASE_URL } from '../Service/Public/Helper';

const Cartprod = () => {

    const navigate = useNavigate();

    const [total,setTotal] = useState([])
    const [data, setData] = useState([])

    useEffect(()=>{
        getCartDataFromTheServer().then((response)=>{
            setProductData(response);
        }).catch(error=>{
            console.log(error)
        })
    },[])

    const setProductData = (response) => {
        const newProduct = []
        let sum=0

        response.forEach((resp) => {
            if(resp.cartType === "2"){
                newProduct.push(resp)
                sum = sum + parseInt(resp.total_price)
            }
        });

        setData(newProduct);
        setTotal(sum.toString())
    }


    const inc = (product,event,totalprice,mainprice) => {

        event.preventDefault();
        let sum = parseInt(total) + mainprice;

        setData(data.map((item) => {
            if (item.id === product.id) {
                setTotal(sum)
                return { ...item, quantity: (parseInt(item.quantity) + 1).toString(),total_price:totalprice };
            }
            return item;
        }));

        // update server cart
        data.forEach((d)=>{
            if(d.id === product.id){
                updateCartData(d.id,parseInt(d.quantity)+1)
            }
        })
    };

    const dec = (product,event,totalprice,mainprice) => {

        event.preventDefault();
        let sum = parseInt(total) - mainprice;

        setData(data.map((item) => {
            if (item.id === product.id && parseInt(item.quantity) > 1) {
                setTotal(sum)
                return { ...item, quantity: (parseInt(item.quantity) - 1).toString(),total_price:totalprice };
            }
            return item;
        }));

        // update server cart
        data.forEach((d)=>{
            if(d.id === product.id){
                updateCartData(d.id,parseInt(d.quantity)-1)
            }
        })
    };

    const updateCartData = (cartId,qty) => {
        updateCartDataToServer(qty,cartId).then((response)=>{
            console.log(response);                                // CONSOLE
        }).catch(error=>console.log(error))
    }

    const handlePayment = (event)=>{
        handleRazorPay(total,2,event,navigate);
    }

    const handleRemove = (cart) => {
        const array = data.filter((item)=>item.id !== cart.id)
        let sum = parseInt(total) - parseInt(cart.total_price)
        setData(array);
        setTotal(sum);

        deleteCartData(cart.id).then((response)=>{
            console.log(response);
        }).catch(error=>console.log(error))
    }
    

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p className='pa'>Lab Tests</p>
                <p className='pa'>Title</p>
                <p className='pa'>Price</p>
                <p className='pa'>Quantity</p>
                <p className='pa'>Total</p>
                {/* <p>Remove</p> */}
            </div>
            <hr />
            <div>
                {
                    data.map((datas) => (
                        <>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={BASE_URL+'/serve/image/'+datas.img} alt="now" className="carticon-product-icon p" style={{ paddingRight: "28px" }} />
                                {/* <p className='pa'>{datas.name}</p> */}
                                <div>
                                    <p className='sect'>{datas.name}</p>
                                    <p className='rmv' onClick={()=>handleRemove(datas)}>Remove</p>
                                </div>
                                <p className='pa'>₹{datas.main_price}</p>
                                <p className='cartitems-quantity pa'>

                                    <div className="btn-group">
                                        <button className="decrement-btn" onClick={(e) => dec(datas,e,(parseInt(datas.total_price) - parseInt(datas.main_price)).toString(),parseInt(datas.main_price))}>
                                            <FaMinus />
                                        </button>

                                        <p className="p1">{datas.quantity}</p>

                                        <button className="increment-btn" onClick={(e) => inc(datas,e,(parseInt(datas.total_price) + parseInt(datas.main_price)).toString(),parseInt(datas.main_price))}>
                                            <FaPlus />
                                        </button>
                                    </div>

                                </p>
                                <p className='pa'>₹{datas.total_price}</p>
                                {/* <TiDelete size={30} style={{ position: 'relative', left: '2.8rem' }} /> */}
                            </div>
                            <hr />
                        </>
                    ))
                }

                
            </div>
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1 className='card-total'>Cart Totals</h1>

                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>₹{total}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <div className="cartitems-total-item">
                            <p>Total</p>
                            <p>₹{total}</p>
                        </div>
                    </div>
                    <button onClick={(e)=>handlePayment(e)}>Procced To Checkout</button>
                </div>
            </div>



        </div>
    )
}

export default Cartprod