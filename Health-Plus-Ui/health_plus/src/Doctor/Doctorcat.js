import React, { useEffect, useState } from 'react'
import AllDoc from './AllDoc'
import { getDoctorCatFromServer } from '../Service/Public/Pub_Axios/Doctor-service'
import Header from '../Navbar/Header';

const Doctorcat = () => {

  const [data, setData] = useState([]);

  useEffect(
    () => {
      getDoctorCatFromServer().then((data) => {
        setData(data);
      }).catch(error => {
        console.log(error);
      })
    },
    []
  )

  return (
    <div>
      <Header>
        <AllDoc data={data} />
      </Header>
    </div>
  )
}

export default Doctorcat