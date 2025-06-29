import React, { useEffect, useState } from 'react'
import Accordian from '../../Pages/Admin/Accordian'
import { Button } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import { getDoctorCatFromServer } from '../../Service/Public/Pub_Axios/Doctor-service'

const Doctordetails = () => {

  const navigate = useNavigate()
  const columnData = ["Serial No", "Dr. Name", "Degree", "Fees"]
  const [data, setData] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = "#dcdfce"
    getDoctorCatFromServer().then(data => {
      setData(data)
    }).catch(error => console.log(error))
  }, [])

  const addDoctorDetails = () => {
    navigate('/addDocDetail')
  }

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", alignItems: "center", marginLeft: "480px" }}>
        <h1 style={{ color: "#156f6c", fontSize: "30px" }}>Doctor Details</h1>
        <Button
          style={{ backgroundColor: "#156f6c", color: "#fff", border: "2px solid black", marginLeft: "300px", height: "50px", width: "200px" }}
          onClick={() => {
            addDoctorDetails();
          }}
        >Add Details
        </Button>
      </div>
      <hr />
      <Accordian columnData={columnData} data={data} />
    </div>
  )
}

export default Doctordetails