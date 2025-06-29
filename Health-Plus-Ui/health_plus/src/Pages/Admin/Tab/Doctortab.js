import React,{useEffect,useState} from 'react'
import '../../../Cart/Tabcart.css'
import Doctorform from '../Form/Doctorform'
import Doctorcatform from '../Form/Doctorcatform'

const Doctortab = () => {

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
                    Doctor Category
                </button>

                <button className={activeTab === 'tab2' ? 'active-tab' : ''} onClick={() => handleTabChange('tab2')}>
                    Doctors
                </button>
            </div>

            <div className="cart-container">
                <div className="cart">
                    {activeTab === 'tab1' && (
                        <div>
                            <Doctorcatform />
                        </div>
                    )}

                    {activeTab === 'tab2' && (
                        <div>
                           <Doctorform />
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Doctortab