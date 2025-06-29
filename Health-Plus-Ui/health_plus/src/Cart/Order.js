import React, { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';
import { getAllOrderFromServer } from '../Service/Public/Priv_Axios/Payment-service';
import Header from '../Navbar/Header';

const Wrapper = styled.section`

.table-container{  
  max-width: 80%;
  margin: 40px auto;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #f9f9f9;
  padding: 20px;
 }

  .heading {
    text-align: center;
    font-size: 2.5em;
    color: #009879;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .styled-table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    font-size: 16px;
    margin-bottom: 40px;
  }

  .styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }

  .styled-table th,
  .styled-table td {
    padding: 12px 15px;
  }

  .styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  .styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
  }

  .styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
  }

  .styled-table tbody tr:hover {
    background-color: #f1f1f1;
  }

  .remove-btn {
    background: none;
    border: none;
    color: #ff0000;
    cursor: pointer;
    font-size: 1.2em;
    transition: transform 0.2s;
  }

  .remove-btn:hover {
    transform: scale(1.2);
  }
`;

const Order = () => {

  useEffect(() => {
    getAllOrderFromServer().then(response => {
      setOrderData(response)
    }).catch(error => console.log(error))
  }, []);

  const setOrderData = (response) => {
    const newProduct = []
    const newLabTest = []

    response.forEach((resp) => {
      if (resp.cartType === "2") {
        newProduct.push(resp)
      } else if (resp.cartType === "1") {
        newLabTest.push(resp)
      }

      setData1(newProduct)
      setData2(newLabTest)
    })
  }

  // const initialData1 = [
  //     { id: 1, name: 'Item 1', category: 'Category 1', quantity: 10, price: 100 },
  //     { id: 2, name: 'Item 2', category: 'Category 2', quantity: 20, price: 200 },
  //     { id: 3, name: 'Item 3', category: 'Category 3', quantity: 30, price: 300 },
  //     { id: 4, name: 'Item 4', category: 'Category 4', quantity: 40, price: 400 },
  //     { id: 5, name: 'Item 5', category: 'Category 5', quantity: 50, price: 500 },
  //   ];

  //   const initialData2 = [
  //     { id: 6, name: 'Product 1', category: 'Type A', quantity: 5, price: 150 },
  //     { id: 7, name: 'Product 2', category: 'Type B', quantity: 10, price: 250 },
  //     { id: 8, name: 'Product 3', category: 'Type C', quantity: 15, price: 350 },
  //     { id: 9, name: 'Product 4', category: 'Type D', quantity: 20, price: 450 },
  //     { id: 10, name: 'Product 5', category: 'Type E', quantity: 25, price: 550 },
  //   ];

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  const handleRemove = (id, setData, data) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };

  return (
    <Wrapper>
      <Header>
        <div className="table-container">
          <h1 className="heading">LAB TESTS</h1>
          <table className="styled-table">
            <thead>
              <tr>
                <th>SL_NO.</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {data1.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.detail}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className="remove-btn" onClick={() => handleRemove(item.id, setData1, data1)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h1 className="heading">PRODUCT</h1>
          <table className="styled-table">
            <thead>
              <tr>
                <th>SL_NO.</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            <tbody>
              {data2.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.detail}</td>
                  <td>{item.price}</td>
                  <td>
                    <button className="remove-btn" onClick={() => handleRemove(item.id, setData2, data2)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Header>
    </Wrapper>
  )
}

export default Order