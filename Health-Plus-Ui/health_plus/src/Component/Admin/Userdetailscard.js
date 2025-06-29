import React, { useEffect, useState } from 'react'
import './Css/Userdetailscard.css'
import { getAllUserDataFromServerToAdmin } from '../../Service/Private/User-Admin-Service'

const Userdetailscard = () => {

    const [user, setUser] = useState([])

    useEffect(() => {
        document.body.style.backgroundColor = "#dcdfce"
        getAllUserDataFromServerToAdmin().then(response => {
            setUser(response)
        }).catch(error => console.log(error))
    }, [])


    return (
        <div className='mainDiv'>
            <h1 style={{ fontSize: "50px" }}>User Datails</h1>
            <hr />
            <table style={{ marginTop: "80px" }}>
                <tr>
                    <th>Serial number</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone No.</th>
                    <th>Address</th>
                </tr>

                {
                    user.map((data,index) => (
                        <tr>
                            <td>{index+1}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.phone}</td>
                            <td>{data.address}</td>
                        </tr>

                    ))
                }

            </table>
        </div>
    )
}

export default Userdetailscard