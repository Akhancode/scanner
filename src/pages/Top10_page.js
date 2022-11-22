import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Top10_page = () => {
    const [Topten,setTopten] = useState([])
    const refresh = () =>{
        axios.get("https://www.binance.com/api/v3/ticker/price").then(async(response) => {
        console.log(response.data)
        setTopten(response.data)
      });
    }


  return (
    <div className="App">
    <header className="Header">
      <h5>Top 10 page </h5>
      <h5>**...websocket...** </h5>
    </header>
    <body>
      <div className="container">
          <Link to={`/`} style={{ textDecoration: 'none' ,color:"black"}}>
              <button className='btn-primary'>
                  Home
              </button>
          </Link>
            <button onClick={refresh}>refresh</button>
          <table>
            <tr>
              <th>COIN</th>
              <th>in USDT</th>
              <th>in BTC</th>
              <th>in ETH</th>
              <th>in BNB</th>
              
            </tr>
            {
            Topten?.map((coin)=>{
                    console.log(coin)
               return(
                <tr>
                    <td>{coin.symbol}</td>
                    <td>{coin.price}</td>
                </tr>
               )
            })}
          </table>
      </div>
    </body>
  </div>
  )
}

export default Top10_page