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
    const [tempData,SettempData] = useState([])
    const [coingecko,setCoingecko] = useState([])
    let [FilteredData , setFilteredData ] = useState([])
    let profitData = []

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
        let ETH_USDT=(Binancedata?.filter((x)=>x.symbol === `ETHUSDT`))[0]?.price
        let BTC_USDT=(Binancedata?.filter((x)=>x.symbol === `BTCUSDT`))[0]?.price
        showData.forEach((element,index) => {
          
              profitData.push({
                "index":index,
                "coin":element.symbol,
                "p_USDT":element.price_USDT,
                "p_ETH":element.price_ETH,
                "ETH_USDT":ETH_USDT,
                "p_BTC":element.price_BTC,
                "BTC_USDT":BTC_USDT,
                "profit_ETH":((100/element.price_USDT)*element.price_ETH*ETH_USDT)-100,
                "profit_BTC":((100/element.price_USDT)*element.price_BTC*BTC_USDT)-100
              })
        
          
        });
        
        // await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=7d%2C24h%2C30d").then((response)=>{
        //   setCoingecko(response.data)
        // }).then(()=>{
        //   console.log(coingecko)
        // })
        console.log(profitData)
        
      }
      catch(err){
        console.log(err.message)
        
      }

    }

    const sortProfit = ()=>{
      let filterBTC = tempData.filter((coin)=>coin.profit_BTC)
      let sortBtc = filterBTC.sort(
        (p1, p2) => (p1.profit_BTC < p2.profit_BTC) ? 1 : (p1.profit_BTC > p2.profit_BTC) ? -1 : 0);
      
      console.log("PROFIT BY BTC : _____________")
      sortBtc.map(coin=>console.log(`${coin.symbol} : ${coin.profit_BTC} profit by BTC`))
      // console.log(sortedProfit)
      
      setShowData(sortBtc)
    }
    const sortETHProfit = ()=>{
      console.log(tempData)
      
      let filterETH = tempData.filter((coin)=>coin.profit_ETH)
      let sortETH = filterETH.sort(
        (p1, p2) => (p1.profit_ETH < p2.profit_ETH) ? 1 : (p1.profit_ETH > p2.profit_ETH) ? -1 : 0);
      
      console.log("PROFIT BY ETH : _____________")
      sortETH.map(coin=>console.log(`${coin.symbol} : ${coin.profit_ETH} profit by ETH`))
      // console.log(sortedProfit)
      
      setShowData(sortETH) 
    }

    const MakeData =async () =>{ 
    //  GET COINGECKO DATA
      try{
        console.log("test")
        
        await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=7d%2C24h%2C30d").then((response)=>{
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
      
      let ETH_USDT=(Binancedata?.filter((x)=>x.symbol === `ETHUSDT`))[0]?.price
      let BTC_USDT=(Binancedata?.filter((x)=>x.symbol === `BTCUSDT`))[0]?.price
      
      coingecko.map((coin,index)=>{
        let coinSymbol = coin.symbol.toUpperCase()
        let coinImg = coin.image
        
        // GET FROM BINANCE make filter data 
        FilteredData.push({
          "index":index,
          "symbol":coinSymbol,
          "image":coinImg,
          "price_BTC":(Binancedata?.filter((x)=>x.symbol === `${coinSymbol}BTC`))[0]?.price,
          "price_ETH":(Binancedata?.filter((x)=>x.symbol === `${coinSymbol}ETH`))[0]?.price,
          "price_BUSD":(Binancedata?.filter((x)=>x.symbol === `${coinSymbol}BUSD`))[0]?.price,
          "price_USDT":(Binancedata?.filter((x)=>x.symbol === `${coinSymbol}USDT`))[0]?.price,
          "ETH_USDT":ETH_USDT,
          "BTC_USDT":BTC_USDT,
          "profit_ETH":((100/(Binancedata?.filter((x)=>x.symbol === `${coinSymbol}USDT`))[0]?.price)*(Binancedata?.filter((x)=>x.symbol === `${coinSymbol}ETH`))[0]?.price*ETH_USDT)-100,
          "profit_BTC":((100/(Binancedata?.filter((x)=>x.symbol === `${coinSymbol}USDT`))[0]?.price)*(Binancedata?.filter((x)=>x.symbol === `${coinSymbol}BTC`))[0]?.price*BTC_USDT)-100
        
        })
      })

      //CALCULATING PROFIT AND PUSHING INTO PROFITDATA ARRAY
      // FilteredData.forEach((element,index) => {
        
      //       profitData.push({
      //         "index":index,
      //         "coin":element.symbol,
      //         "p_USDT":element.price_USDT,
      //         "p_ETH":element.price_ETH,
      //         "ETH_USDT":ETH_USDT,
      //         "p_BTC":element.price_BTC,
      //         "BTC_USDT":BTC_USDT,
      //         "profit_ETH":((100/element.price_USDT)*element.price_ETH*ETH_USDT)-100,
      //         "profit_BTC":((100/element.price_USDT)*element.price_BTC*BTC_USDT)-100
      //       })
      
        
      // });
      
      
      //MOVING FILTERED DATA TO SHOWDATA AND EMPTYING THE FILTERDATA
      setShowData(FilteredData)
      SettempData(FilteredData)
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
          <div className='buttonContainer'>
              <button onClick={test}>Test</button>
              <button onClick={MakeData}>Make Data</button>
              <button onClick={check}>CHECK</button>
              <button onClick={test}>Get Profit</button>
              <button onClick={sortProfit}>sort by BTC Profit</button>
              <button onClick={sortETHProfit}>sort by ETH Profit</button>
          </div>
            <table>
              <tr>
                <th>INDEX</th>
                <th>COIN</th>
                <th>in BTC</th>
                <th>in ETH</th>
                <th>in USDT</th>
                <th>Profit BTC</th>
                <th>Profit ETH</th>
              </tr>
              {
                 
                 showData?.map((coin,i)=>{                  
                  {
                
                    console.log("***********************************************")
                    console.log(coin)
                    
                    
                     return(
                      <tr>
                        <td>{i+1}</td>
                        <td>{coin.symbol}</td>
                        <td>{coin.price_BTC}</td>
                        <td>{coin.price_ETH}</td>
                        <td>{coin.price_USDT}</td>

                        <td>{coin.profit_BTC}</td>
                        <td>{coin.profit_ETH}</td>


                        {/* <td>{profitData[i]}</td> */}
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
