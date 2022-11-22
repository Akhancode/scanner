import React, { useEffect, useState } from 'react'
import { Link, redirect, useLocation } from 'react-router-dom'

const Detail_page = () => {
    const location = useLocation()
    const {symbol} = location.state
    const {pair} = location.state
    const {curProfit} = location.state
    
    
    const [usdtData,setusdtData] = useState(0)
    const [btcData,setbtcData] = useState(0)
    const [pairUsdtData,setPairUsdtData] = useState(0)
    const [book,setBook] = useState(0)
    const [on,setOn] = useState(true)
    const [profit,setProfit] = useState(curProfit)
    const [brake,setBrake] = useState(false)

    const [toPairData,setToPairData] = useState(0)
    // const [ethData,setethData] = useState(0)
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@bookTicker`);
    const ws_Btc = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}btc@bookTicker`);
    const ws_pair_usdt = new WebSocket(`wss://stream.binance.com:9443/ws/${pair.toLowerCase()}usdt@bookTicker`);
    
    const ws_book  = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}usdt@depth5`);



    // WEBSOCKET OF TICKER BOOK
    const message = () =>{

        if(on){
            
           ws.onmessage = async(event)=>{
                console.log("loading Trade data")
                
        console.log(event.data)
        await setusdtData(JSON.parse(event.data))

  }

    ws_book.onmessage = async (event)=>{
      
      console.log("loading book ticker")
      console.log(brake)
      
      console.log(event.data)
      await setBook(JSON.parse(event.data))
      
    }
    ws_Btc.onmessage = async (event)=>{
        console.log("loading Trade data")               
        console.log(event.data)
        await setbtcData(JSON.parse(event.data))

}
ws_pair_usdt.onmessage = async (event)=>{
console.log("loading Trade data")               
console.log(event.data)
await setPairUsdtData(JSON.parse(event.data))

}
    

}
    else{
        console.log("**************************")
        console.log("**************************")
        console.log("**************************")
        
         ws_book.onmessage = (event)=>{
      
      console.log("loading book ticker")
      console.log(brake)
      
      console.log(event.data)
      setBook(JSON.parse(event.data))
      
    }
        ws_book.onmessage = (event)=>{
      
            console.log("loading book ticker")
            console.log(brake)
            
            console.log(event.data)
            setBook(JSON.parse(event.data))
            
            ws_book.close()
          }
        // ws.close()
    }
        }
    const closesocket = () =>{
        // console.log(ws.readyState)
        // console.log(ws_book.readyState)
        // ws.close()
        // ws_book.close()
        window.location.reload()
        console.log("clclclclcllclcllclclclclclcllclcllclc")
    
        ws.close()
        
        
    }




    useEffect(() => {
        console.log('the "on" has changed', on)
        if(on){
            message()
        }
        
       
     }, [on])

   
  return (
    <>
    <div className='navDiv'>
        {/* BUTTON WITH DIV */}
            <button style={{  all: "unset", cursor: "pointer"}}onClick={()=>{
                console.log(ws.readyState)
                console.log(ws.OPEN)
                console.log("clicked")}}>
                    <div style={{backgroundColor:"grey",padding:"10px"}}>
                        <Link to="/">Home</Link></div>
            </button>
        {/* BUTTON WITH DIV */}
            <button style={{  all: "unset", cursor: "pointer"}}onClick={()=>{
                console.log(on)
                // change on 
                on?setOn(false):setOn(true)
        
                }}>

                    <div style={{backgroundColor:"grey",padding:"10px"}}>{on?`DISCONNECT`:`CONNECT`}</div>
            </button>
        {/* BUTTON WITH DIV */}
            <button style={{  all: "unset", cursor: "pointer"}}onClick={()=>{
               
                // ws.close()
                closesocket()
                
                }}>

                    <div style={{backgroundColor:"grey",padding:"10px"}}>{on?`CLOSE`:`CLOSE NOW`}</div>
            </button>
        {/* BUTTON WITH DIV */}
            <button style={{  all: "unset", cursor: "pointer"}}onClick={()=>{

          
                }}>

                    <div style={{backgroundColor:"grey",padding:"10px"}}>Test</div>
            </button>
    </div>
    <div className='liveDataContainer'>

        
        {/* MAJOR  */}
        <div className='symbolDiv' style={{height:"10vh" ,marginBottom:"3vh"}}>
            <text className='symbolText' style={{fontSize:"3vw"}}>COIN</text>
        </div>
        <div className='priceDiv' style={{height:"10vh",marginBottom:"3vh"}}>
            <text className='priceText' style={{fontSize:"3vw",color:'#484848'}}>PRICE</text>
        </div>
        <div className='profitDiv' style={{height:"10vh",marginBottom:"3vh"}}>
            <text className='priceText' style={{fontSize:"3vw"}}>PROFIT</text>
        </div>

        {/* MAJOR DATA */}
        <div className='symbolDiv'>
            <text className='symbolText' style={{fontSize:"4vw"}} >{symbol}</text>
        </div>
        <div className='priceDiv'>
            <text className='priceText' style={{fontSize:"3vw"}} >$ {Math.round(usdtData.a*100000)/100000} </text>
        </div>
        <div className='profitDiv'>
            {/* <text className='priceText'  >{profit>0?`+ ${profit}`:profit}%</text> */}
            <div className='profitContainer'>
            <div style={{margin:"10px", padding:"10px" ,borderRight:"solid",borderColor:"white"}} >
                <h4 style={{color:"white",fontSize:"1vw"}}>Zero Risk</h4>
                <text className='priceText'  style={{fontSize:"2vw"}} >{
                    ( 
                        //Zero Risk Trade [take best in asks and bids]
                        Math.round(((100/usdtData.a)*(btcData.b)*(pairUsdtData.b)-100)*100)/100
                        )
                    }%  </text>
                    <br/>
            </div>
            <div  style={{margin:"10px"}}>
                <h4 style={{color:"white",fontSize:"1vw"}}>Risky</h4>
                <text className='priceText'  style={{fontSize:"1vw"}} >{
                    (
                        // Risky Trade [take best in asks and bids]
                        Math.round(((100/usdtData.b)*(btcData.a)*(pairUsdtData.a)-100)*100)/100
                        )
                    }% </text>
            </div>
            </div>
                <br/>
                {/* <text className='priceText' style={{fontSize:"20px"}}  >without Fee</text> */}
       
        </div>

        {/* PAIRS HEADING */}
        <div className='symbolDiv' style={{height:"10vh" ,marginTop:"5vh",marginBottom:"3vh"}}>
            <text className='symbolText' style={{fontSize:"1.5vw"}}>BUY {symbol}/USDT</text>
        </div>
        <div className='priceDiv' style={{height:"10vh" ,marginTop:"5vh",marginBottom:"3vh"}}>
            <text className='priceText' style={{fontSize:"1.5vw"}}>Sell {symbol}/{pair}</text>
        </div>
        <div className='profitDiv' style={{height:"10vh" ,marginTop:"5vh",marginBottom:"3vh"}}>
            <text className='priceText' style={{fontSize:"1.5vw"}}>SELL {pair}/USDT</text>
        </div>

        {/* PAIRS DATA */}
        <div className='symbolDiv'>
            <div className='bidaskContainer'>

            <text className='priceText' style={{fontSize:"2vw",color:"#484848"}}>Asks : {usdtData.a}</text>
            <text className='priceText' style={{fontSize:"1.5vw" ,color:"#484848"}}>Bids : {usdtData.b}</text>
            </div>
        </div>
        <div className='priceDiv'>
            <div className='bidaskContainer'>

            <text className='priceText' style={{fontSize:"2vw"}}>Asks : {btcData.a}</text>
            <text className='priceText' style={{fontSize:"1.5vw"}}>Bids : {btcData.b}</text>
            </div>
        </div>
        <div className='profitDiv'>
        <div className='bidaskContainer'>

                <text className='priceText' style={{fontSize:"1.5vw"}}>Asks : {pairUsdtData.a}</text>
                <text className='priceText' style={{fontSize:"2vw"}}>Bids : {pairUsdtData.b}</text>
                </div>
        </div>

        

{/*         
        <div className='symbolDiv' style={{height:"10vh" ,marginTop:"3vh"}}>
            <text className='symbolText' style={{fontSize:"30px"}}>Buy {symbol} / usdt</text>
        </div>
        <div className='priceDiv' style={{height:"10vh",marginTop:"3vh"}}>
            <text className='priceText' style={{fontSize:"30px"}}>Sell {symbol} with {pair} </text>
        </div>
        <div className='profitDiv' style={{height:"10vh",marginTop:"3vh"}}>
            <text className='priceText' style={{fontSize:"30px"}}>Sell {pair} with USDT</text>
        </div> */}




        {/* bids table book */}
        <table className='tableClass'>
            <h5 className='table_name_bids'>BUYERS</h5>
        <tr>    
            <th className='table_col_1' style={{color:"#484848"}}>BIDS</th>
            <th className='table_col_2' style={{color:"#484848"}}>QTY</th>
            <th className='table_col_3'>PRICE</th>
        </tr>
        {book.bids?.map((bid,i)=>{
            return(
                
                <tr>
            <td className='table_col_1'>{i+1}</td>
            <td className='table_col_2'>{bid[1]}</td>
            <td className='table_col_3'>{bid[0]}</td>
        </tr>
            )
        })}
        </table>
        {/* Asks table book */}
        <table className='tableClass'>
  
            <h5 className='table_name_asks'>SELLERS</h5>
        <tr>    
            <th className='table_col_1' style={{color:"#484848"}}>ASKS</th>
            <th className='table_col_2' style={{color:"#484848"}}>QTY</th>
            <th className='table_col_3'>PRICE</th>
        </tr>
        {book.asks?.map((ask,i)=>{
            return(
                
        <tr>
            <td className='table_col_1'>{i+1}</td>
            <td className='table_col_2'>{ask[1]}</td>
            <td className='table_col_3'>{ask[0]}</td>
        </tr>
            )
        })}
    </table>
    </div>
   
    </>
  )
}

export default Detail_page