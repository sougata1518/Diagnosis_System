import React, { useState,useEffect } from 'react'
import './Tabcart.css'
import { BiTestTube } from "react-icons/bi";
import { FaShopify } from "react-icons/fa";
import Cartlab from './Cartlab';
import Cartprod from './Cartprod';
import Header from '../Navbar/Header';

const Tabcart = () => {


    useEffect(() => {
        document.body.style.backgroundColor = "#fff"
      }, [])
      

    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

    return (
        <Header>
            <div className='tab-container'>
                <div className="tabs">
                    <button className={activeTab === 'tab1' ? 'active-tab' : ''} onClick={() => handleTabChange('tab1')}>
                        <BiTestTube size={20} /> Lab Test
                    </button>

                    <button className={activeTab === 'tab2' ? 'active-tab' : ''} onClick={() => handleTabChange('tab2')}>
                        <FaShopify size={20} /> Products
                    </button>
                </div>

                <div className="cart-container">
                    <div className="cart">
                        {activeTab === 'tab1' && (
                            <div>
                                <Cartlab />
                            </div>
                        )}

                        {activeTab === 'tab2' && (
                            <div>
                                <Cartprod />
                            </div>
                        )}
                    </div>

                </div>
            </div>
            
        </Header>
    )
}

export default Tabcart