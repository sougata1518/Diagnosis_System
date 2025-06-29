import React,{useState} from 'react'
import './Css/Accordian.css'
import { BsChevronUp,BsChevronDown } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineSystemUpdateAlt } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { deleteProductDataFromAdmin } from '../../Service/Private/Product-service';

const Productaccordian = ({columnData,data}) => {

    const [selected,setSelected] = useState(null)
    const navigate = useNavigate();

    const toggle = (i) =>{
        if(selected === i){
            return setSelected(null)
        }
        setSelected(i)
    }

    const deleteData = (event,id)=>{
        event.preventDefault();
        
        deleteProductDataFromAdmin(id);
        navigate("/AdminPage")
    }

    const updateProductData = (event,product) => {
        event.preventDefault();
        navigate("/prodUpdate",{state:product})
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
                                item.products.map((prod,index)=>(
                                    <tr>
                                        <td>{index+1}</td>
                                        <td>{prod.name}</td>
                                        <td>{prod.price}</td>
                                        <td>{prod.dist_per}</td>
                                        <td>{prod.dist_price}</td>
                                        <td><MdOutlineSystemUpdateAlt onClick={(e)=>updateProductData(e,prod)} /></td>
                                        <td><AiOutlineDelete onClick={(e)=>deleteData(e,prod.id)} /></td>
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

export default Productaccordian