import React from 'react'
import '../Component/Intro.css'
import FloatinDiv from './FloatingDiv/Floatingdiv'
import { motion } from 'framer-motion';
import Vector1 from './Image/Vector1.png'
import Vector2 from './Image/Vector2.png'
import medicine1 from './Image/med1.png'
import medicine2 from './Image/med2.png'
import doc from './Image/doctor.png'
import lab from './Image/lab.png'

const Intro = () => {

    const transition = {duration:2,type:"spring"};

  return (
    <div className="Intro" id="Intro">
    {/* left name side */}
    <div className="i-left">
      <div className="i-name">
        {/* yahan change hy darkmode ka */}
        <span>Welcome To</span>
        <span>Health Plus Diagonostics</span>
        <span>
          We're determined for your better life. You can get the the care you need 24/7 - be it online or in person. 
          We’ve made healthcare accessible to every patient by giving them quality care at affordable prices. We are your one-stop destination for other healthcare products as well, such as over the counter pharmaceuticals, medicines, healthcare products or devices.
        </span>
      </div>
    </div>

    {/* right image side */}
    <div className="i-right">
      <img src={Vector1} alt="" />
      <img src={Vector2} alt="" />
      <img src={doc} alt="" />

      {/* animation */}
      <motion.img
        initial={{ left: "-36%" }}
        whileInView={{ left: "-24%" }}
        transition={transition}
        src={medicine1}
        alt=""

      />

      <motion.div
        initial={{ top: "-4%", left: "74%" }}
        whileInView={{ left: "68%" }}
        transition={transition}
        className="floating-div"
      >
        <FloatinDiv img={medicine2} text1="Safe & Secure" text2="Products" />
      </motion.div>

      {/* animation */}
      <motion.div
        initial={{ left: "9rem", top: "18rem" }}
        whileInView={{ left: "0rem" }}
        transition={transition}
        className="floating-div"
      >
        {/* floatinDiv mein change hy dark mode ka */}
        <FloatinDiv img={lab} text1="100% Safe" text2="Lab Services" />
      </motion.div>

      <div className="blur" style={{ background: "rgb(238 210 255)" }}></div>
      <div
        className="blur"
        style={{
          background: "#C1F5FF",
          top: "17rem",
          width: "21rem",
          height: "11rem",
          left: "-9rem",
        }}
      ></div>
    </div>
  </div>
  )
}

export default Intro