import React,{useState} from 'react'
import './Css/Accordian.css'
import { BsChevronUp,BsChevronDown } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { deleteLabTestDataFromAdmin } from '../../Service/Private/Lab-service';
import {useNavigate} from 'react-router-dom'

const Labaccordian = ({columnData,data}) => {

    const navigate = useNavigate()
    const [selected,setSelected] = useState(null)

    const toggle = (i) =>{
        if(selected === i){
            return setSelected(null)
        }
        setSelected(i)
    }

    const deleteLabData = (event,id) => {
        event.preventDefault();

        deleteLabTestDataFromAdmin(id);
        navigate("/AdminPage")
    }

    const updateLabTest = (event,labtest) => {
        event.preventDefault();
        navigate("/labUpdate",{state:labtest})
    }

  return (
    <div className='main'>
        <div className='wrapper'>
        <div className='accordian'>
            {
                data.map((item,i)=>(
                    <div className='item'>
                        <div className={selected === i?'title show':'title'} onClick={()=>toggle(i)}>
                            <h4>{item.name}</h4>
                            <span>{selected === i?<BsChevronUp />:<BsChevronDown />}</span>
                        </div>
                        <div className={selected === i?'content show':'content'}>
                            <table>
                                <tr>
                                    {
                                        columnData.map((cld)=>(
                                            <th>{cld}</th>
                                        ))
                                    }
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                                {
                                    item.labTest.map((lab,index)=>(
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{lab.name}</td>
                                            <td>{lab.mainPrice}</td>
                                            <td>{lab.distPer}</td>
                                            <td>{lab.distPrice}</td>
                                            <td><MdOutlineSystemUpdateAlt onClick={(e)=>updateLabTest(e,lab)} /></td>
                                            <td><AiOutlineDelete onClick={(e)=>deleteLabData(e,lab.id)} /></td>
                                        </tr>
                                    ))
                                }
                            </table>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
    </div>
  )
}

export default Labaccordian