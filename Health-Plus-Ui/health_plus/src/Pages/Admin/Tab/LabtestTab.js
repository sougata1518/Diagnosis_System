import React,{useEffect,useState} from 'react'
import '../../../Cart/Tabcart.css'
import Labtestcatform from '../Form/Labtestcatform'
import Labtestform from '../Form/Labtestform'

const LabtestTab = () => {

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
                    Labtest Category
                </button>

                <button className={activeTab === 'tab2' ? 'active-tab' : ''} onClick={() => handleTabChange('tab2')}>
                    Labtests
                </button>
            </div>

            <div className="cart-container">
                <div className="cart">
                    {activeTab === 'tab1' && (
                        <div>
                            <Labtestcatform />
                        </div>
                    )}

                    {activeTab === 'tab2' && (
                        <div>
                           <Labtestform />
                        </div>
                    )}
                </div>

            </div>
        </div>
  )
}

export default LabtestTab