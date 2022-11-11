import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import React, { useState } from "react"

function App() {

   
    const [Binancedata ,setBinanceData ] = useState([])
    const[BinanceUsdtPairs ,setBinanceUsdtPairs ] = useState(null)
    const[BinanceEthPairs ,setBinanceEthPairs ] = useState(null)
    const[BinanceBTCPairs ,setBinanceBTCPairs ] = useState(null)
    const[CoinbaseUsdtPairs ,setCoinbaseUsdtPairs ] = useState(null)
    const [showData,setShowData] = useState([])
    const [coingecko,setCoingecko] = useState([])
    let [FilteredData , setFilteredData ] = useState([])

    class CoinClass {
      constructor(name, Binprice=null,CoinBaseprice=null,basePair) {
        this.name = name;
        this.Binanceprice = Binprice;
        this.CoinBaseprice = CoinBaseprice;
        this.basePair = basePair
      }
    }
    const test =async()=>{
      try{
        console.log("test")
        
        await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=7d%2C24h%2C30d").then((response)=>{
          setCoingecko(response.data)
        }).then(()=>{
          console.log(coingecko)
        })
        
      }
      catch(err){
        console.log(err.message)
        
      }

    }


    const MakeData =async () =>{ 
    //  GET COINGECKO DATA
      try{
        console.log("test")
        
        await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=7d%2C24h%2C30d").then((response)=>{
          setCoingecko(response.data)
        }).then(()=>{
          console.log(coingecko)
        })
        
      }
      catch(err){
        console.log(err.message)
        
      }

      axios.get("https://www.binance.com/api/v3/ticker/price").then(async(response) => {
        setBinanceData(response.data)
      });
      console.log(Binancedata)

      coingecko.map((coin)=>{
        let coinSymbol = coin.symbol.toUpperCase()
        let coinImg = coin.image

        // GET FROM BINANCE make filter data 
        FilteredData.push({
          "symbol":coinSymbol,
          "image":coinImg,
          "price_BTC":(Binancedata?.filter((x)=>x.symbol === `${coinSymbol}BTC`))[0]?.price,
          "price_ETH":(Binancedata?.filter((x)=>x.symbol === `${coinSymbol}ETH`))[0]?.price,
          "price_USDT":(Binancedata?.filter((x)=>x.symbol === `${coinSymbol}USDT`))[0]?.price,
        })
      })

      setShowData(FilteredData)
      setFilteredData([])
    }

    const check = () =>{
      console.log(FilteredData)
      console.log(showData)
      
      
    }
    
    // setInterval(function() {
    //   MakeData()
    // }, 3000);
    
    // React.useEffect( () => {
      
      
    // }, []);
    
    // const interval = setInterval(() => {
     
    //   // MakeData()
       
    // }, 5000);
    // return () => clearInterval(interval);
  return (
    <div className="App">
      <header className="Header">
        <h5>GOOD TRACK</h5>
      </header>
      <body>
        <h3>Table</h3>
        <div className="container">
        <button onClick={test}>Check coinmarket cap</button>
         <button onClick={MakeData}>Make Data</button>
         <button onClick={check}>CHECK</button>
            <table>
              <tr>
                <th>INDEX</th>
                <th>COIN</th>
                <th>PER BTC</th>
                <th>PER ETH</th>
                <th>PER USDT</th>
              </tr>
              {
                 
                 showData?.map((coin,i)=>{                  
                  {
                    
                     return(
                      <tr>
                        <td>{i+1}</td>
                        <td>{coin.symbol}</td>
                        <td>{coin.price_BTC}</td>
                        <td>{coin.price_ETH}</td>
                        <td>{coin.price_USDT}</td>
                        {/* {coin.coinbase?<td>{coin.coinbase}</td>:<td className='null'>N/A</td>} */}
                      </tr>
                     ) 
                  }
                 })
              }
               {/* {
                 
                 Binancedata?BinanceUsdtPairs.map((coin,i)=>{                  
                  {
                    
                     return(
                      <tr>
                        <td>{i+1}</td>
                        <td>{coin.symbol}</td>
                        <td>{coin.price}</td>
                        <td>{coin.price}</td>
                      </tr>
                     ) 
                  }
                 }):console.log("not found data")
              }  */}

              <tr>
                <td>data</td>
                <td>data</td>
                <td>data</td>
              </tr>
            </table>
        </div>
      </body>
    </div>
  );
}

export default App;
