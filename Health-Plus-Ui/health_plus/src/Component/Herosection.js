import React from 'react'
import labtest from './Heroimg/Blood Test.png'
import doctor from './Heroimg/Doctor.png'
import consult from './Heroimg/Medical App.png'
import product from './Heroimg/Products 1.png'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Herosection = () => {

    const Wrapper = styled.div`
    display: flex;
      justify-content: center; /* Centers content horizontally */
      align-items: center; /* Centers content vertically */
      height: 100vh; /* Makes body height equal to viewport height */
      margin: 0; /* Removes default margin */
 

      .card-container {
        display: flex;
        flex-wrap: wrap; /* Allows cards to wrap to the next line */
        justify-content: space-around; /* Equal space between cards */
        max-width: 1200px; /* Max width of container */
        padding: 20px; /* Padding to maintain spacing */
      }
  
      .card {
        width: calc(25% - 20px); /* Equal width for each card with spacing */
        margin-bottom: 20px; /* Spacing between cards */
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Shadow effect */
        border: 1px solid #ccc; /* Border added */
        transition: transform 0.3s ease; /* Transition effect for transform */
      }
  
      .card:hover {
        transform: scale(1.07); /* Enlarge the card on hover */
      }
  
      .card img {
        width: 100%;
        height: auto;
        background-color: #ffffff; /* Image background color */
      }
  
      .card-content {
        padding: 20px;
      }
  
      .card-content h2 {
        margin-top: 0;
        margin-bottom: 20px;
      }
  
      .card-content p {
        margin-bottom: 25px;
      }
  
      .card-content .button {
        background-color: #155653; /* Button background color */
        color: #ffffff; /* Button text color */
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        text-decoration: none;
      }
  
      .card-content .button:hover {
        background-color: #0d3b3f; /* Button background color on hover */
      }
  
      /* Background color and text color for different cards */
      .card:nth-child(1) .card-content {
        background-color: #e5f9f8; /* Background color for 1st card */
        color: #000; /* Text color for 1st card */
      }
  
      .card:nth-child(2) .card-content {
        background-color: #fff3d6; /* Background color for 2nd card */
        color: #000; /* Text color for 2nd card */
      }
  
      .card:nth-child(3) .card-content {
        background-color: #f1edfd; /* Background color for 3rd card */
        color: #000; /* Text color for 3rd card */
      }
  
      .card:nth-child(4) .card-content {
        background-color: #fcedf2; /* Background color for 4th card */
        color: #000; /* Text color for 4th card */
      }
    `;

    return (
        <Wrapper>
            <div class="card-container">
                <div class="card">
                    <img src={labtest} alt='search-icon' />
                    <div class="card-content">
                        <h2>Lab Tests</h2>
                        <p>Some quick example text to build on the card title and make up the bulk
                            of the card's content.</p>
                        <NavLink to="/lab-tests" className='button'> view More </NavLink>
                    </div>
                </div>

                <div class="card">
                    <img src={doctor} alt='search-icon' />
                    <div class="card-content">
                        <h2>Find a Doctor</h2>
                        <p>Some quick example text to build on the card title and make up the bulk
                            of the card's content.</p>
                        <NavLink to="/find-a-doctor" className='button'> view More </NavLink>
                    </div>
                </div>

                <div class="card">
                    <img src={consult} alt='search-icon' />
                    <div class="card-content">
                        <h2>Consult Us</h2>
                        <p>Some quick example text to build on the card title and make up the bulk
                            of the card's content.</p>
                        <NavLink to="/consult-us" className='button'> view More </NavLink>
                    </div>
                </div>

                <div class="card">
                    <img src={product} alt='search-icon' />
                    <div class="card-content">
                        <h2>Product</h2>
                        <p>Some quick example text to build on the card title and make up the bulk
                            of the card's content.</p>
                        <NavLink to="/product" className='button'> view More </NavLink>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default Herosection