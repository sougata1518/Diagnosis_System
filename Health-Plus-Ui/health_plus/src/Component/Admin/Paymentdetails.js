import React, { useEffect, useState } from 'react'
import './Css/Userdetailscard.css'
import { getAllPaymentDataFromServerToAdmin } from '../../Service/Private/Payment-Admin-Service'

const Paymentdetails = () => {

    const [payment, setPayment] = useState([])

    useEffect(() => {
        document.body.style.backgroundColor = "#dcdfce"
        getAllPaymentDataFromServerToAdmin().then(response => {
            setPayment(response)
        }).catch(error => console.log(error))
    }, [])

    return (
        <div className='mainDiv'>
          
            <h1 style={{ fontSize: "50px" }}>Payment Datails</h1>
            <hr />
            <table style={{ marginTop: "80px" }}>
                <tr>
                    <th>Serial number</th>
                    <th>Name</th>
                    <th>Details</th>
                    <th>Payment</th>
                </tr>

                {
                    payment.map((data, index) => (
                        <tr>
                            <td>{index+1}</td>
                            <td>{data.user.name}</td>
                            <td>{data.detail}</td>
                            <td>{data.price}</td>
                        </tr>
                    ))
                }

            </table>
        </div>
    )
}

export default Paymentdetails