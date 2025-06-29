import React, { useEffect, useState } from 'react'
import './Css/Userdetailscard.css'
import { getAllConsultDataFromServerToAdmin } from '../../Service/Private/Consult-Admin-Service'

const Consultation = () => {

  const [consult, setConsult] = useState([])

  useEffect(() => {
    document.body.style.backgroundColor = "#dcdfce"
    getAllConsultDataFromServerToAdmin().then(response => {
      setConsult(response)
    }).catch(error => console.log(error))
  }, [])

  return (
    <div className='mainDiv'>
      <h1 style={{ fontSize: "50px" }}>Consultation Details</h1>
      <hr />
      <table style={{ marginTop: "80px" }}>
        <tr>
          <th>Serial number</th>
          <th>Patient Name</th>
          <th>Patient Email</th>
          <th>Gender</th>
          <th>Phone Number</th>
          <th>Reason of Consultaion</th>
          <th>Date for Consultaion</th>
          <th>Date for Consultation</th>
        </tr>

        {
          consult.map((data, index) => (
            <tr>
              <td>{index+1}</td>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{data.gender}</td>
              <td>{data.number}</td>
              <td>{data.reason}</td>
              <td>{data.app_date}</td>
              <td>{data.consultation_time}</td>
            </tr>
          ))
        }


      </table>
    </div>
  )
}

export default Consultation