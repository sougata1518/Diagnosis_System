import React, { useEffect, useState } from 'react'
import './Account.css';
import Header from '../../Navbar/Header';
import { doLogout, getCurrentUserDetail, getToken} from '../../LocalStorage';
import { updateUserDataToServer } from '../../Service/Public/Pub_Axios/User-service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Account = () => {

    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = "#dcdfce";
        const data = getCurrentUserDetail()
        let uname = (data.name).split(" ");
        setData({
            ...data,id:data.id,
            firstname:uname[0],
            lastname:uname[1],
            email:data.email,
            phone:data.phone,
            address:data.address,
            city:data.city,
            state:data.state,
            pin:data.pin
        })
    }, [])

    //Two way data binding 
    const [data, setData] = useState({
        id:'',
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pin: ''
    })

    const handleChange = (event, field) => {
        setData({
            ...data, [field]: event.target.value
        })
    }

    const updateData = async (event) =>{
        event.preventDefault();
        var username = data.firstname + " " + data.lastname
        const token = await getToken();
        await updateUserDataToServer({
            name:username,
            email:data.email,
            phone:data.phone,
            address:data.address,
            city:data.city,
            state:data.state,
            pin:data.pin
        },data.id,token).then(response=>{
            localStorage.setItem("data",JSON.stringify(response))
            toast.success("Data updated successfully !!", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined
            })
        }).catch(error=>console.log(error))
    }

    const logout = (event) => {
        event.preventDefault();
        doLogout(()=>{
            navigate("/")
        })
    }

    return (
        <Header>
            <div className='fullcard'>
                <div className='card1'>

                    <div className='user-avatar'>
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="Maxwell Admin" className='im' />
                    </div>
                    <div className='user-detail'>
                        <h5 class="user-name">{data.firstname + " " + data.lastname}</h5>
                        <h6 class="user-email">{data.email}</h6>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '100px' }}>
                        <button className='btn' onClick={(e)=>logout(e)} style={{ color: '#fff', backgroundColor: '#ed0a30b6', border: '1px solid #ed0a30b6' }}>logout</button>
                    </div>
                </div>
                <div className='card2'>

                    <div className='card-body'>
                        <div class="row gutters">
                            <div>
                                <h6 className='details'>Personal Details</h6>
                            </div>
                            <div className='sec'>
                                <div className='user-details section'>
                                    <div class="form-group">
                                        <label for="fullName">First Name</label>
                                        <br />
                                        <input value={data.firstname} type="text" class="form-control" id="fullName" placeholder="Enter First name"
                                            onChange={(e) => handleChange(e, 'firstname')}
                                        />
                                    </div>
                                    <div class="form-group">
                                        <label for="fullName">Last Name</label>
                                        <br />
                                        <input value={data.lastname} type="text" class="form-control" id="fullName" placeholder="Enter Last name"
                                            onChange={(e) => handleChange(e, 'lastname')}
                                        />
                                    </div>
                                </div>

                                <div className='user-details'>
                                    <div class="form-group">
                                        <label for="eMail">Email</label>
                                        <br />
                                        <input value={data.email} type="email" class="form-control" id="eMail" placeholder="Enter email ID"
                                            onChange={(e) => handleChange(e, 'email')}
                                        />
                                    </div>


                                    <div class="form-group">
                                        <label for="phone">Phone</label>
                                        <br />
                                        <input value={data.phone} type="number" class="form-control" id="phone" placeholder="Enter phone number"
                                            onChange={(e) => handleChange(e, 'phone')}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div>
                            <div>
                                <h6 className='details'>Address</h6>
                            </div>
                            <div className='sec'>
                                <div className='user-details'>
                                    <div class="form-group">
                                        <label for="Street">House No. ,Bulding Name</label>
                                        <br />
                                        <input value={data.address} type="name" class="form-control" id="Street" placeholder="Enter House No. ,Bulding Name"
                                            onChange={(e) => handleChange(e, 'address')}
                                        />
                                    </div>


                                    <div class="form-group">
                                        <label for="ciTy">City</label>
                                        <br />
                                        <input value={data.city} type="name" class="form-control" id="ciTy" placeholder="Enter City"
                                            onChange={(e) => handleChange(e, 'city')}
                                        />
                                    </div>
                                </div>

                                <div className='user-details'>
                                    <div class="form-group">
                                        <label for="sTate">State</label>
                                        <br />
                                        <input value={data.state} type="text" class="form-control" id="sTate" placeholder="Enter State"
                                            onChange={(e) => handleChange(e, 'state')}
                                        />
                                    </div>

                                    <div class="form-group">
                                        <label for="zIp">Pincode</label>
                                        <br />
                                        <input value={data.pin} type="number" class="form-control" id="zIp" placeholder="Pincode"
                                            onChange={(e) => handleChange(e, 'pin')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='btnsec'>
                                <button className='btn' style={{ color: '#fff', backgroundColor: '#484844b1', border: '1px solid #484844b1' }} type="button"
                                    class="btn btn-secondary">Cancel</button>
                                <button className='btn' type="button" style={{ color: '#fff', backgroundColor: 'rgb(0, 119, 255)', border: '1px solid rgb(0, 119, 255)' }}
                                    class="btn btn-primary" onClick={(e)=>updateData(e)} >Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </Header>
    )
}

export default Account