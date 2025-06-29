import React,{useEffect} from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../Service/Public/Helper';

const Alltest = ({data}) => {
    useEffect(() => {
        document.body.style.backgroundColor = "#fff"
      }, [])

    const navigate = useNavigate();
    const Wrapper = styled.div`
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 30px;
        padding: 70px;
        justify-content: center; /* Center align items horizontally */
        justify-content: space-around; /* Equal space between cards */

        /* Add border shadow to cards */
    .aj .bj {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease; /* Add animation transition */
        height: 90px; /* Set height for cards */
    }

    /* Add hover effect to cards */
    .aj:hover .bj {
        transform: scale(1.15); /* Enlarge the card on hover */
    }

    /* 1st box start */
    .first{
        min-height: 50px;
        /* width out */
        width: 250px;
    }

    .aj{
      display: block;
      text-decoration: none;
      color: inherit;
      outline: 0;
  }

  .bj{
      background-color: #fff;
      border: 1px solid #e7e7e5;
      border-radius: 12px;
      padding: 8px 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
  }

  .cj {
      margin-right: 50px;
      margin-left: 20px;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
  }
  .cj img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;

    width: 40px;
    height: 40px;
}

.ej{
    color: #4b4a48;
    padding-top: 10px;
}
  `;

  const sentDataToLabTest = (labTestData)=>{
        navigate('/test',{state:labTestData})
  }

  return (
    <Wrapper>
      
    {
        data.map((data)=>(
            <div class="first">
        <div onClick={()=>{
            sentDataToLabTest(data.labTest)
        }} className="aj">
        <div class="bj">
                <div class="cj">
                    <img src={BASE_URL+'/serve/image/'+data.img} alt="Full body checkup icon" />
                </div>
                <div class="dj">
                    <p class="ej">{data.name}</p>
                </div>
            </div>
        </div>
    </div>

        ))
    }

    </Wrapper>
  )
}

export default Alltest