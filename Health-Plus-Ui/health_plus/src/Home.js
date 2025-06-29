import React, { useEffect } from 'react'
import Intro from './Component/Intro'
import Herosection from './Component/Herosection'
import Header from './Navbar/Header'

const Home = () => {

  useEffect(() => {
    document.body.style.backgroundColor = "#fff"
  }, [])

  return (
    <div>
      <Header>
      <div className="App">
        <Intro />
      </div>
      <Herosection />
      </Header>
    </div>
  )
}

export default Home