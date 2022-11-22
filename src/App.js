import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App_page from './pages/App_page'
import Detail_page from './pages/Detail_page'
import Live_page from './pages/Live_page'
import Top10_page from './pages/Top10_page'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<App_page />}/>
          <Route path="/live" element={<Live_page />} />
          <Route path="/detail" element={<Detail_page />} />
          <Route path="/top10" element={<Top10_page />} />
         
        
      </Routes>
    </BrowserRouter>
  )
}

export default App