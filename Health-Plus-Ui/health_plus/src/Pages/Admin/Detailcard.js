import React from 'react'
import './Css/Detailcard.css'
import UserImg from './Adminimg/USERMANAGEMET.png'
import ProductImg from './Adminimg/productmanagement.png'
import LabTestImg from './Adminimg/LABTESTMANAGEMENT.png'
import DoctorImg from './Adminimg/DocManagement.png'
import ConsultImg from './Adminimg/CONSULTATION_INFO.png'
import PaymentImg from './Adminimg/PAYMENTMANAGEMENT.png'
import { Link } from 'react-router-dom'

const Detailcard = () => {
  return (
    <>
        <div className='containerAd'>
            <div className='box'>
            <Link to="/userDetail" action>
                <img src={UserImg} alt='Image 1' />
            </Link>
            </div>
        </div>
        <div className='containerAd'>
            <div className='box'>
                <Link to="/productDetail" action>
                    <img src={ProductImg} alt='Image 1' />
                </Link>
            </div>
        </div>
        <div className='containerAd'>
            <div className='box'>
                <Link to="/labTestDetail" action>
                    <img src={LabTestImg} alt='Image 1' />
                </Link>
            </div>
        </div>
        <div className='containerAd'>
            <div className='box'>
                <Link to="/doctorDetail" action>
                    <img src={DoctorImg} alt='Image 1' />
                </Link>
            </div>
        </div>
        <div className='containerAd'>
            <div className='box'>
            <Link to="/ConsultDetails" action>
                    <img src={ConsultImg} alt='Image 1' />
            </Link>
            </div>
        </div>
        <div className='containerAd'>
            <div className='box'>
            <Link to="/paymentDetail" action>
                <img src={PaymentImg} alt='Image 1' />
                </Link>
            </div>
        </div>
    </>

  )
}

export default Detailcard