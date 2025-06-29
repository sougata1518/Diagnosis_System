import React, { useEffect, useState } from 'react'
import Alltest from './Alltest'
import { getLabTestCatDataFromServer } from '../Service/Public/Pub_Axios/Labtest-service'
import Header from '../Navbar/Header'

const Labtestcat = () => {

    useEffect(
        () => {

            document.body.style.backgroundColor = "#fff"

            getLabTestCatDataFromServer().then((data) => {
                setData(data);
            }).catch(error => {
                console.log(error);
            })
        },
        []
    )

    const [data, setData] = useState([]);

    return (
        <div>
            <Header>
                <Alltest data={data} />
            </Header>
        </div>
    )
}

export default Labtestcat