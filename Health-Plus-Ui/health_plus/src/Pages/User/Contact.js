import React from 'react'
import styled from 'styled-components';
import Header from '../../Navbar/Header';

const Contact = () => {

    const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 2rem;
      background-color: #f2f2f2; /* Added background color */

      .contact-form {
        max-width: 50rem;
        height: 100%; /* Changed height value */
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;
            width: 100%; /* Added width */
            padding: 1rem; /* Added padding */
            background-color: #007bff; /* Changed background color */
            border: none;
            color: white;

            &:hover {
              background-color: #0056b3; /* Changed hover background color */
              border: 1px solid black;
              color: black;
              transform: scale(0.9);
            }
          }

          input[type="text"],
          input[type="email"],
          textarea {
            width: 100%; /* Added width */
            padding: 1rem; /* Added padding */
            border: 1px solid #ccc; /* Added border */
            border-radius: 5px; /* Added border radius */
          }

          textarea {
            resize: vertical; /* Added vertical resize */
          }
        }
      }
    }
  `;

    return (
       <Header>
        <Wrapper style={{marginTop:'-150px'}}>
            <h2 className='common-heading' style={{fontSize:'30px'}}>Contact page</h2>

            {/* google map */}
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58945.28981400131!2d88.35587132167966!3d22.576088099999993!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0275b086df5d53%3A0x8d5e0a9a01e6ed75!2sTechno%20India%20Group!5e0!3m2!1sen!2sin!4v1709403722841!5m2!1sen!2sin"
                width="100%" height="250" style={{ border: 0 }}
                allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>

            {/* Enter section */}
            <div className='container'>
                <div className='contact-form'>
                    <form action="https://formspree.io/f/mdoqzrnn" method='POST' className='contact-inputs'>
                        <input type="text" placeholder='Username' name='username' required autoCapitalize='off' style={{width:'1000px'}} />
                        <input type="email" placeholder='Email' name='Email' required autoCapitalize='off' />
                        <textarea name="Message" placeholder='Enter your message' id="" cols="30" rows="10" required autoCapitalize='off'></textarea>
                        <input type="submit" value="Send" />
                    </form>
                </div>
            </div>
        </Wrapper>
       </Header> 
    )
}

export default Contact