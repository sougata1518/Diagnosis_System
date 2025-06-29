import React,{ useEffect, useState }  from 'react'
import styled from 'styled-components'
import Products from './Products'

const Allproduct = ({data}) => {

    useEffect(() => {
        document.body.style.backgroundColor = "#fff"
      }, [])
    
      const Wrapper = styled.div`
         padding-top: 20px;
        margin-left: 20px;
        padding-bottom: 10px;  
      `;
      const SectionTitle = styled.h1`
      margin-top: 40px;
      font-weight: bold;
      font-size: 30px; /* Adjust the font size as needed */
    `;

  return (
    <Wrapper>

      {
        data.map((cat) => (
          <>
            <SectionTitle>{cat.name}</SectionTitle>
            {/* <BabyCare /> */}
            <Products data={cat.products} />
          </>
        ))
      }


      {/* <SectionTitle>Sanitary Pads</SectionTitle>
    <Pads />
    <SectionTitle>Skincare Range</SectionTitle>
    <Skincare /> */}
    </Wrapper>
  )
}

export default Allproduct