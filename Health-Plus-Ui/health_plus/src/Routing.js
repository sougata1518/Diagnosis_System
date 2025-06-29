import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Doctordetails from './Component/Admin/Doctordetails'
import Adminhomepage from './Component/Admin/Adminhomepage'
import Labtestdetails from './Component/Admin/Labtestdetails'
import Userdetailscard from './Component/Admin/Userdetailscard'
import Consulation from './Component/Admin/Consultation'
import Paymentdetails from './Component/Admin/Paymentdetails'
import Productdetail from './Component/Admin/Productdetail'
import Adminlogin from './Component/Admin/Adminlogin'
import Doctortab from './Pages/Admin/Tab/Doctortab'
import Producttab from './Pages/Admin/Tab/Producttab'
import LabtestTab from './Pages/Admin/Tab/LabtestTab'
import Docupdateform from './Pages/Admin/Form/Update-Form/Docupdateform'
import Labtestform from './Pages/Admin/Form/Update-Form/Labtestform'
import Productupdateform from './Pages/Admin/Form/Update-Form/Productupdateform'

import Home from './Home'
import Labtestcat from './LabTest/Labtestcat'
import Test from './LabTest/Test'
import Doctorcat from './Doctor/Doctorcat'
import Doctors from './Doctor/Doctors'
import Productcat from './Product/Productcat'
import Account from './Pages/User/Account'
import Contact from './Pages/User/Contact'
import Consultus from './Pages/User/Consultus'
import Tabcart from './Cart/Tabcart'
import Useraccount from './User-account/Useraccount'
import Privateroute from './Service/Public/Privateroute'
import Otp from './User-account/Otp'
import Confirmpassword from './User-account/Confirmpassword'
import Order from './Cart/Order'


const Routing = () => {
  return (
    <div>
      <Routes>

        {/* ADMIN ROUTING */}

        <Route path='/doctorDetail' element={<Doctordetails />} />
        <Route path='/labTestDetail' element={<Labtestdetails />} />
        <Route path='/productDetail' element={<Productdetail />} />
        <Route path='/userDetail' element={<Userdetailscard />} />
        <Route path='/ConsultDetails' element={<Consulation />} />
        <Route path='/paymentDetail' element={<Paymentdetails />} />
        <Route path='/addDocDetail' element={<Doctortab />} />
        <Route path="/addProductDetail" element={<Producttab />} />
        <Route path="/addLabTestDetail" element={<LabtestTab />} />
        <Route path="/docUpdate" element={<Docupdateform />} />
        <Route path="/labUpdate" element={<Labtestform />} />
        <Route path="/prodUpdate" element={<Productupdateform />} />

        <Route path='/AdminPage' element={<Adminhomepage />} />
        <Route path='/admin-login' element={<Adminlogin />} />


        {/* User Routing */}

        <Route exact path="/" element={<Home />} />
        <Route path="/lab-tests" element={<Labtestcat />} />
        <Route path="/test" element={<Test />} />
        <Route path="/find-a-doctor" element={<Doctorcat />} />
        <Route path="/doctor" element={<Doctors />} />
        <Route path="/product" element={<Productcat />} />
        <Route path="/account" element={<Account />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/consult-us" element={<Consultus />} />
        <Route path="/user-login" element={<Useraccount />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/confirmpass" element={<Confirmpassword />} />

        <Route path="/privateRoute" element={<Privateroute />} >
            <Route path="cart" element={<Tabcart />} />
            <Route path="order" element={<Order />} />
        </Route>

      </Routes>
    </div>
  )
}

export default Routing