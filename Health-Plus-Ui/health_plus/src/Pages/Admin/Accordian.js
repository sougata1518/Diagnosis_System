import React,{useState} from 'react'
import './Css/Accordian.css'
import { BsChevronUp,BsChevronDown } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { deleteDoctorDataFromAdmin} from '../../Service/Private/Doc-service';
import { useNavigate } from 'react-router-dom';

const Accordian = ({columnData,data}) => {

    const [selected,setSelected] = useState(null)
    const [datas,setDatas] = useState([])
    const navigate = useNavigate()

    const toggle = (i) =>{
        if(selected === i){
            return setSelected(null)
        }
        setSelected(i)
    }

    const deleteData = (event,id) => {
        event.preventDefault();

        deleteDoctorDataFromAdmin(id);
        navigate("/AdminPage")
    }

    const updateData = async (event,doc)=>{
        event.preventDefault();
        navigate("/docUpdate",{state:doc})
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
                                    item.doctor.map((doc,index)=>(
                                        <tr>
                                            <td>{index+1}</td>
                                            <td>{doc.name}</td>
                                            <td>{doc.degree}</td>
                                            <td>{doc.fee}</td>
                                            <td><MdOutlineSystemUpdateAlt onClick={(e)=>updateData(e,doc)} /></td>
                                            <td><AiOutlineDelete onClick={(e)=>deleteData(e,doc.id)} /></td>
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

export default Accordian