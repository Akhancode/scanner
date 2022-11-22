import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
const Live_page = () => {
    const location = useLocation()
    const {symbol} = location.state
    const {pair} = location.state
    
    
    const [usdtData,setusdtData] = useState(0)
    const [btcData,setbtcData] = useState(0)
    const [ethData,setethData] = useState(0)
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@depth5`);
    ws.onmessage = (event)=>{
      
      console.log(event.data)
      setusdtData(JSON.parse(event.data))

  }

       
    
  return (
    <div className="App">
      <header className="Header">
        <h5>LIVE - MARKET DATA </h5>
        <h5>**...websocket...** </h5>
      </header>
      <body>
    
        <div className="container">
            <Link to={`/`} style={{ textDecoration: 'none' ,color:"black"}} >
                <button className='btn-primary' onClick={()=>{
                            
            ws.onclose=function(event){
              console.log("disconnected")
              
            }
                }}>
                    Home
                </button>
            </Link>
            <table>
              <tr>
                <th>COIN</th>
                <th>in USDT</th>
                <th>in BTC</th>
                <th>in ETH</th>
                
              </tr>
  
              <tr>
                <td>{symbol}</td>
                <td>{usdtData.p}</td>
                <td>{btcData.p}</td>
                <td>{ethData.p}</td>
             
              </tr>
            </table>
        </div>
      </body>
    </div>
  )
}

export default Live_page