import React,{useEffect,useState} from 'react'
import '../../../Cart/Tabcart.css'
import Productcatform from '../Form/Productcatform'
import Productform from '../Form/Productform'

const Producttab = () => {

    useEffect(() => {
        document.body.style.backgroundColor = "#fff"
    }, [])

    const [activeTab, setActiveTab] = useState('tab1');

    const handleTabChange = (tab) => {
        setActiveTab(tab)
    }

  return (
    <div className='tab-container'>
            <div className="tabs">
                <button className={activeTab === 'tab1' ? 'active-tab' : ''} onClick={() => handleTabChange('tab1')}>
                    Product Category
                </button>

                <button className={activeTab === 'tab2' ? 'active-tab' : ''} onClick={() => handleTabChange('tab2')}>
                    Products
                </button>
            </div>

            <div className="cart-container">
                <div className="cart">
                    {activeTab === 'tab1' && (
                        <div>
                           <Productcatform />
                        </div>
                    )}

                    {activeTab === 'tab2' && (
                        <div>
                           <Productform />
                        </div>
                    )}
                </div>

            </div>
        </div>
  )
}

export default Producttab