import React,{useEffect, useState} from 'react'
import { Button } from 'reactstrap'
import Labaccordian from '../../Pages/Admin/Labaccordian'
import { getLabTestCatDataFromServer } from '../../Service/Public/Pub_Axios/Labtest-service'
import { useNavigate } from 'react-router-dom'

const Labtest = () => {

  const columnData = ["Serial No","Test Name","Price","Discounted percentage(%)","Discounted Price"]
  const [data, setData] = useState([])

  useEffect(()=>{
    document.body.style.backgroundColor="#dcdfce"
    getLabTestCatDataFromServer().then(data => {
      setData(data)
    }).catch(error => console.log(error))
  },[])

  const navigate = useNavigate();

  const handleAdd = (event) => {
    event.preventDefault();
    navigate("/addLabTestDetail")
    
  }

  return (
    <div style={{textAlign:"center"}}>
        <div style={{display:"flex",alignItems:"center",marginLeft:"480px"}}>
          <h1 style={{color:"#156f6c",fontSize: "30px" }}>Lab Test Details</h1>
          <Button
           style={{backgroundColor:"#156f6c",color:"#fff",border:"2px solid black",marginLeft:"300px",height:"50px",width:"200px"}} onClick={(e)=>handleAdd(e)}
           >Add LabTest</Button>
        </div>
        <hr />
        <Labaccordian columnData={columnData} data={data} />
    </div>
  )
}

export default Labtest